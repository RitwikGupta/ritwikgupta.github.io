---
title: Understanding HL7 Structure
pubDate: 2017-03-29
description: I spent a long time working with and fixing broken HL7 and ADT pipelines at hospitals. Here are my learnings.
og_image: ../../assets/blog/hc/hl7-1.jpg
---

# What is HL7
HL7, more formally known as Health Level-7, is a standard used in the healthcare industry to transfer clinical and administrative data. Much like many SaaS services "speak JSON", healthcare applications "speak HL7".

### Versions of HL7
There are two main versions of HL7: **HL7 v2.x** and **HL7 3**.
#### HL7 2.x
HL7 2 was originally created in 1989, dubbed "Pipehat". Since then, we have had a lot of revisions of the standard, giving us:
* HL7 v2.1
* HL7 v2.2
* HL7 v2.3
* HL7 v2.3.1
* HL7 v2.4
* HL7 v2.5
* HL7 v2.5.1
* HL7 v2.6
* HL7 v2.7
* HL7 v2.7.1
* HL7 v2.8
* HL7 v2.8.1
* HL7 v2.8.2

All HL7 2.x versions are **backwards compatible**! This is good news for new HL7 applications, as supporting HL7 v2.7 means that you would be supporting everything from v2.1-v2.7, but not anything above that.

### HL7 v3
HL7 v3 was published in 2005. It is based around a formal methodology called **HDF** (ISO/HL7 27931 for those of you who love standards). It does some really fancy stuff that hasn't really been adopted yet. For this reason, this post will focus mainly on HL7 v2.x.

# HL7 Structure
For this section, we will use the sample HL7 message below (obtained from [here](http://support.pb.com/help/spectrum/9.1/webhelp/en/EnterpriseDataIntegrationGuide/ClientTools/ReadFromHL7/ReadFromHL7.html)) to analyze. Please note that this is dummy data and not actual PII (aka don't sue me, thanks).
```
MSH|^~\&||.|||199908180016||ADT^A04|ADT.1.1698593|P|2.7
PID|1||000395122||LEVERKUHN^ADRIAN^C||19880517180606|M|||260 GOODWIN CREST DRIVE^^BIRMINGHAM^AL^35 209^^M~NICKELL’S PICKLES^10000 W 100TH AVE^BIRMINGHAM^AL^35200^^O||(157)983-3296|||S||12354768|87654321
NK1|1|TALLIS^THOMAS^C|GRANDFATHER|12914 SPEM ST^^ALIUM^IN^98052|(157)883-6176
NK1|2|WEBERN^ANTON|SON|12 STRASSE MUSIK^^VIENNA^AUS^11212|(123)456-7890
IN1|1|PRE2||LIFE PRUDENT BUYER|PO BOX 23523^WELLINGTON^ON^98111|||19601||||||||THOMAS^JAMES^M|F|||||||||||||||||||ZKA535529776
```
To start off, let's look at the image below:
![segments](../../assets/blog/hc/hl7-1.jpg)

### The red boxes ###
Every section inside a red box is called a **segment**. Segments are groups of data that each contain related pieces of information. Each segment has a **carriage return (\r)** at the end of it to demarcate the end of a segment. 

### The green boxes ###
Each segment begins with a three letter string called a **header**. In this picture, everything in a green box is a header (MSH, PID, NK1, and IN1). Note that the MSH header is special. A segment with an MSH header will *always* begin an HL7 message, and that segment is thus called the **message header**.
 
### Fields ###
Let us look at one segment for the time being:
![segment](../../assets/blog/hc/hl7-2.jpg)
Within a segment, each **field** is separated with the pipe character ( | ), called a **bar** in HL7 terminology. Two or more bars in a row indicate an empty field. In the example above, we can see the the first field (indexed by *PID.1*) holds a value of 1, *PID.2* is empty, and *PID.3* holds a value of 000395122. Since this is a version 2.7 HL7 message (indicated by MSH.12), we can view exactly what each PID field means [here](http://hl7-definition.caristix.com:9010/Default.aspx?version=HL7+v2.7&segment=PID). However, fields get more and more complicated as we go along.

#### Components ####
If we look at *PID.5* (LEVERKUHN^ADRIAN^C), we can see that there are **carets (^)** in the field value. A caret delimits a **component**, which are a smaller unit of fields. *PID.5* describes the Patient Name and is split into three components here: a surname, a given name, and a middle initial. We can index these as *PID.5.1*, *PID.5.2*, and *PID.5.3*, respectively. Components can also have **subcomponents**, delimited by an **ampersand (&)**, but these are rarely used.

#### Repeated Fields ####
Sometimes there are fields that can hold multiple values, and thus we must repeat them. An example of this can be an address: one for home and one for work. Repeated fields are delimited with a **tilde (~)**. For an example, let us look at *PID.11* (260 GOODWIN CREST DRIVE^^BIRMINGHAM^AL^35 209^^M~NICKELL’S PICKLES^10000 W 100TH AVE^BIRMINGHAM^AL^35200^^O). Notice that there is a tilde present here, indicating that this field contains two addresses. These two addresses are indexed as *PID.11(1)* and *PID.11(2)*, respectively. Repeated fields are a powerful and flexibly way to represent information that carry the same semantics.

## Conclusion
This is a simple walkthrough of the structure of HL7 messages. HL7 gets weirder and more complex as you read more into it (custom segments and groups, anyone?), but this level of understanding will allow you to perform the majority of HL7 tasks without a hitch. As a fun exercise, try writing a simple HL7 parser that implements this level of HL7 structure understanding (this is a good beginner programming project, for any beginners reading this post).
