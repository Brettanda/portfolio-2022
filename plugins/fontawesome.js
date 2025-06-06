import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faBars, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faCodepen, faLinkedin, faFacebook, faDev } from '@fortawesome/free-brands-svg-icons'
import { faSun, faMoon, faLink, faDesktop } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(faGithub, faCodepen, faLinkedin, faFacebook, faSun, faMoon, faLink, faDesktop, faDev,faCircleInfo)

// Register the component globally
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})