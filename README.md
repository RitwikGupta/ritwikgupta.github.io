# Ritwik Gupta

## Setup
1. Install and set up Astro: https://docs.astro.build/en/install-and-setup/
2. Clone repo and `cd` into project folder
3. Run the following commands
```
pnpm i
pnpm dev
```
4. Navigate to http://localhost:4321/

## Project Structure
The files you need to care about (all in `src/pages`):
* `_home`
    * `intro.astro`: the profile card at the top of the homepage (`/`), up to and including the social links
    * `short-bio.md`: the list of affiliations
    * `news.md`: the news list in the homepage
* `about`
    * `_full-bio.md`: your complete bio in `/about`
* `blog`
    * `posts`: contains all the Markdown files for each post in `/blog/posts/...`
* `press`
    * `_press.md`: list of press releases in `/press`
* `publications`
    * `_content/list.ts`: list of publications in `/publications` (each publication is an object of type `Pub`)
* `students`
    * `_list.md`: list of students in `/students`
