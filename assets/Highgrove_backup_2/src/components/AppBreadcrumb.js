/* eslint-disable */

import React from 'react'
import { useLocation } from 'react-router-dom'
import HomeIcon from 'src/assets/images/Home.svg'
import routes from '../routes'


import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => {
      if (route.path === pathname || route.path === `${pathname}/:id`) {
        return true;
      }
      return false;
    });
    return currentRoute ? currentRoute.name : false;
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })

    // Add /customers-products/ breadcrumb
    if (location.startsWith('/customers-products/')) {
      breadcrumbs.push({
        pathname: '/customers-products/',
        name: 'Customers Products',
        active: true,
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  const matchPlaceOrder = currentLocation.match(/\/place_order\/(\d+)/)
  const placeOrderId = matchPlaceOrder ? matchPlaceOrder[1] : null
  const matchplaceUser = currentLocation.match(/\/edituser\/(\d+)/i);
  const editUserId = matchplaceUser ? matchplaceUser[1] : null;

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/dashboard">
        <img src={HomeIcon} width={18} />
      </CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => (
        <CBreadcrumbItem
          {...(breadcrumb.active ? { active: true } : { href: `${breadcrumb.pathname}` })}
          key={index}
        >
          {breadcrumb.name}
        </CBreadcrumbItem>
      ))}
      {currentLocation.startsWith('/place_order/') && placeOrderId && (
        <CBreadcrumbItem href={`/place_order/${placeOrderId}`}>
          {/* All Products/ Product Variations */}
        </CBreadcrumbItem>
      )}
      {currentLocation.startsWith('/edituser/') && editUserId && (
        <CBreadcrumbItem href={`/edituser/${editUserId}`}>
          Users / Edit User
        </CBreadcrumbItem>
      )}
    </CBreadcrumb>
  );
}

export default React.memo(AppBreadcrumb)
