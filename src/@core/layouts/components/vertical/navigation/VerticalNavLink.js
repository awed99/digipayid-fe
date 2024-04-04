import { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'

import { KeyboardArrowRight, KeyboardArrowDown } from '@mui/icons-material'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'

// ** Utils
import { handleURLQueries } from 'src/@core/layouts/utils'

import store from 'store'

// ** Styled Components
const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
  width: '100%',
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: 'opacity .25s ease-in-out',
  '&.active, &.active:hover': {
    boxShadow: theme.shadows[3],
    backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`
  },
  '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
    color: `${theme.palette.common.white} !important`
  }
}))

const MenuItemTextMetaWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility, key }) => {
  // ** Hooks
  const router = useRouter()
  const IconTag = item.icon

  const [isOpenChildren, setIsOpenChildren] = useState(false)

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true
    } else {
      return false
    }
  }

  const isNavLinkParentActive = () => {
    let _res = false
    item?.children?.map(itemChildren => {
      if (router.pathname === itemChildren?.path || handleURLQueries(router, itemChildren?.path)) {
        _res = true
      }
    })

    return _res
  }

  const isNavLinkChildrenActive = _item => {
    if (router.pathname === _item.path || handleURLQueries(router, _item.path)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <ListItem
        disablePadding
        className='nav-link'
        disabled={item.disabled || false}
        sx={{ mt: 1.5, px: '0 !important' }}
      >
        <Link passHref href={item.path === undefined ? '/' : `${item.path}`}>
          <MenuNavLink
            component={'a'}
            className={isNavLinkActive() || isNavLinkParentActive() ? 'active' : ''}
            {...(item.openInNewTab ? { target: '_blank' } : null)}
            onClick={e => {
              if (item.path === undefined) {
                e.preventDefault()
                e.stopPropagation()
              } else if (item.path === '/') {
                store.set('module', '')
              }
              if (navVisible) {
                toggleNavVisibility()
              }
              if (item?.children) {
                setIsOpenChildren(!isOpenChildren)
              }
            }}
            sx={{
              pl: 5.5,
              ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
            }}
          >
            <ListItemIcon
              sx={{
                mr: 2.5,
                color: 'text.primary',
                transition: 'margin .25s ease-in-out'
              }}
            >
              <UserIcon icon={IconTag} />
            </ListItemIcon>

            <MenuItemTextMetaWrapper>
              <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
              {item.badgeContent ? (
                <Chip
                  label={item.badgeContent}
                  color={item.badgeColor || 'primary'}
                  sx={{
                    height: 20,
                    fontWeight: 500,
                    marginLeft: 1.25,
                    '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                  }}
                />
              ) : null}
              {item?.children ? isOpenChildren ? <KeyboardArrowDown /> : <KeyboardArrowRight /> : null}
            </MenuItemTextMetaWrapper>
          </MenuNavLink>
        </Link>
      </ListItem>

      {item?.children &&
        isOpenChildren &&
        item?.children?.map((itemChildren, indexChildren) => (
          <ListItem
            key={indexChildren}
            disablePadding
            className='nav-link'
            disabled={itemChildren.disabled || false}
            sx={{ mt: 1.5, ml: 2, px: '0 !important' }}
          >
            <Link passHref href={itemChildren.path === undefined ? '/' : `${itemChildren.path}`}>
              <MenuNavLink
                component={'a'}
                className={isNavLinkChildrenActive(itemChildren) ? 'active' : ''}
                {...(itemChildren.openInNewTab ? { target: '_blank' } : null)}
                onClick={e => {
                  if (itemChildren.path === undefined) {
                    e.preventDefault()
                    e.stopPropagation()
                  } else if (itemChildren.path === '/') {
                    store.set('module', '')
                  }
                  if (navVisible) {
                    toggleNavVisibility()
                  }
                }}
                sx={{
                  pl: 5.5,
                  ...(itemChildren.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
                }}
              >
                <ListItemIcon
                  sx={{
                    mr: 2.5,
                    color: 'text.primary',
                    transition: 'margin .25s ease-in-out'
                  }}
                >
                  <UserIcon icon={itemChildren?.icon} />
                </ListItemIcon>

                <MenuItemTextMetaWrapper>
                  <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{itemChildren.title}</Typography>
                  {itemChildren.badgeContent ? (
                    <Chip
                      label={itemChildren.badgeContent}
                      color={itemChildren.badgeColor || 'primary'}
                      sx={{
                        height: 20,
                        fontWeight: 500,
                        marginLeft: 1.25,
                        '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                      }}
                    />
                  ) : null}
                </MenuItemTextMetaWrapper>
              </MenuNavLink>
            </Link>
          </ListItem>
        ))}
    </>
  )
}

export default VerticalNavLink
