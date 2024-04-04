const themeConfig = {
  // ** Layout Configs
  templateName: process.env.NEXT_PUBLIC_TEMPLATE_NAME /* App Name */,
  subDitName: process.env.NEXT_PUBLIC_TEMPLATE_SUB_NAME /* Sub App Name */,
  themeColor: process.env.NEXT_PUBLIC_THEME_COLOR /* Theme Color */,
  mode: process.env.NEXT_PUBLIC_THEME_MODE /* light | dark */,
  contentWidth: process.env.NEXT_PUBLIC_THEME_CONTENT_WIDTH /* full | boxed */,
  // ** Routing Configs
  routingLoader: true /* true | false */,
  // ** Navigation (Menu) Configs
  menuTextTruncate: true /* true | false */,
  navigationSize: parseInt(
    process.env.NEXT_PUBLIC_THEME_NAVIGATION_WIDTH
  ) /* Number in PX(Pixels) /*! Note: This is for Vertical navigation menu only */,
  // ** Other Configs
  responsiveFontSizes: true /* true | false */,
  disableRipple: false /* true | false */
}

export default themeConfig
