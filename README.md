# wa-vuejs

## Description
wa-vuejs is a headless wordpress theme for Vuejs. 

The main APIs and Platforms used are:
- [Wordpress](https://wordpress.org) with custom meta-boxes, menus, customizable theme - no plugins used
- [Vuejs](https://vuejs.org/) with vuex, vue-router, vue-cli
- [Webpack](https://webpack.js.org/)
- [Postcss](https://postcss.org/)
- [Tailwindcss](https://tailwindcss.com/) Mobile First CSS

### Wordpress Custom Theme

#### Backend
The primary design of this theme is for portfolio sites. The headless custom wordpress theme makes use of the native customize theme functionality to allow for custom logo upload
as an svg or image file, and header and footer menus (multi-dimensional).

Custom Meta-Boxes have been added to the post allowing for gallery upload which is sortable and uses native tools
for adding, editing, and deleting images. Images are also sortable. A multi oEmbed video uploader is also added
with edit, lightbox view, and delete functions. It automatically makes oEmbed items fluid. Both portfolio gallery,
and oEmbed videos are utilzed in a custom touchable lightbox component in the Vuejs frontend.

Webpack is utilized to create a logical file structure and for development watch functionality. 

##### Custom Menus
The the has enabled 2 custom wordpress themes: header, footer. Both are designed to allow for at least 1 child 
level for dtop down capabilities.

The menu capabilities:
|       Menu Item      |         Menu Link       |    Rendered Method    | Route Name |            Notes            |
| -------------------- | ----------------------- | --------------------- | ---------- | --------------------------- |
| Page                 | :pageSlug               | router-link           | Page       |                             |
| Post                 | :YYYY/:MM/:DD/:postSlug | router-link           | Post       |                             |
| Category             | category/:categorySlug  | router-link           | Category   |                             |
| Tags Archive         | archive/tags            | router-link           | Archive    |                             |
| Categories Archive   | archive/category        | router-link           | Archive    |                             |
| Categories - Custom  | #                       | a/javascript:void(0); |            | Dropdown Category Sub-Links |
| &copy; Home - Custom | site_url                | router-link           | Home       | Converts site_url to Route  |


#### Vuejs Frontend
The frontend is built in Vuejs. Making use of Router-Link functionality and transitions it is an animated SPA.

Some of the built in functionality includes:
- Post View using YYYY/MM/DD/SLUG permalink which can be edited in the route
- Page View
- Category View
- Home View with Posts pagination and Pages Pagination - selectable per page range
- Tags as external links to references using tag description
- Lightbox component: Touch enabled functionality with fade and slide animations 
as well as swipe functionality.
  - oEmbed Video Enabled
  - Portfolio Gallery Enabled
- Mobile first design via Tailwindscss for fully responsive design

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run watch
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# wa-vuejs
