# wa-vuejs

## Description
wa-vuejs is a headless wordpress theme for Vuejs. 

The main APIs and Platforms used are:
- [Wordpress](https://wordpress.org) with custom meta-boxes, menus, customizable theme - no plugins used
- [Vuejs](https://vuejs.org/) with vuex, vue-router, vue-cli
- [Webpack](https://webpack.js.org/)
- [Postcss](https://postcss.org/)
- [Tailwindcss](https://tailwindcss.com/) Mobile First CSS

## Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run watch
```
#### Compiles and minifies for production
```
npm run build
```
#### Lints and fixes files
```
npm run lint
```
#### Install Theme
Download to wp-content/themes and enable in wordpress. Then add custom logo: svg, jpg, png, and add site name and description.

## Wordpress Custom Theme

### Backend
The primary design of this theme is for portfolio sites. The headless custom wordpress theme makes use of the native customize theme functionality to allow for custom logo upload
as an svg or image file, and header and footer menus (multi-dimensional).

Custom Meta-Boxes have been added to the post allowing for gallery upload which is sortable and uses native tools
for adding, editing, and deleting images. A multi oEmbed video uploader is also added
with edit, lightbox view, and delete functions. It automatically makes oEmbed items fluid. Both portfolio gallery,
and oEmbed videos are utilzed in a custom touchable lightbox component in the Vuejs frontend.

Webpack is utilized to create a logical file structure and for development watch functionality. 

#### Custom Menus
The theme has enabled 2 menus: header, footer. Both are designed to allow for at least 1 child 
level for drop-down capabilities.

The menu capabilities:
|       Menu Item      |           Menu Link          |    Rendered Method    | Route Name |            Notes             |
| -------------------- | ---------------------------- | --------------------- | ---------- | ---------------------------- |
| Page                 | :pageSlug                    | router-link           | Page       |                              |
| Post                 | :year/:month/:day/:postname  | router-link           | Post       | url is split to slugs        |
| Category             | category/:categorySlug       | router-link           | Category   |                              |
| Tags Archive         | archive/tags                 | router-link           | Archive    | url is split to :taxSlug     |
| Categories Archive   | archive/category             | router-link           | Archive    | url is split to :taxSlug     |
| Categories - Custom  | #                            | a/javascript:void(0); |            | Dropdown Category Sub-Links  |
| &copy; Home - Custom | site_url                     | router-link           | Home       | Converts site_url to Route   |
| Custom Links         | custom url                   | a target=_blank       |            | External Links or Sub-Links  |
| Tag - Custom link    | tag/:tagSlug                 | router-link           | Tag        | Functional Route Not in Menu |


#### Integrated Wordpress Options - Desgined for Versatile Extensibility
The theme has an API route to receive the following options. Some are made available but not currently used.

|            Option          |       Usage       |   Actively used   |
| -------------------------- | ----------------- | ----------------- | 
| blogname                   | page title        |         x         |
| blogdescription            | page title&desc   |         x         |
| home                       |                   |                   |
| siteurl                    | menus home check  |         x         |
| show_avatars               | show author_avatar|         x         |
| posts_per_page             | pagination limit  |         x         |
| posts_per_rss              |                   |                   |
| show_on_front              | posts or page     |         x         |
| page_on_front              | set page to front |         x         |
| page_for_posts             | set page to posts |         x         |
| time_format                |                   |                   |
| timezone_string            |                   |                   |
| thumbnail_size_w           |                   |                   |
| thumbnail_size_h           |                   |                   |
| medium_size_w              |                   |                   |
| medium_size_h              |                   |                   |
| large_size_w               |                   |                   |
| large_size_h               |                   |                   |
| permalink_structure        |                   |                   |
| permalink_router_structure | used in router    |         x         |
| category_base              | used in router    |         x         |
| tag_base                   | used in router    |         x         |

### Vuejs Frontend
The frontend is built in Vuejs. Making use of Router-Link and Vuex functionality and transitions. It is an animated SPA.
Using tailwindcss the design approach is mobile first. 

#### Basic Functionality
- Desgined to allow for Home page as Posts or as Page with Posts Page.
- Post View using :year/:month/:day/:postname
  - Permalink which can be edited in wordpress and updates in the route. 
  - Some Editing to menus may be needed if a post is to be added to menu.
- Page View
- Archives View
  - Defaults to Categories and Tags, custom taxonomies extensible
- Filter Posts by Tag or Category
- Home View with Posts pagination - selectable per page range
  - Range and Page number stored throughout site
- Tags Archives load icon title and description via wa-link-prevue component
  - allows for loading external links to references using tag description
  - Modes are Cards, Icons, Cloud
- Category Archives shows name, description, and count
- Lightbox component: Touch enabled functionality with fade and slide animations 
as well as swipe functionality.
  - oEmbed Video Enabled
  - Portfolio Gallery Enabled
- Dropdown Menus, automatic switch to mobile menu as well.
- Mobile first design via Tailwindscss for fully responsive design


## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# wa-vuejs
