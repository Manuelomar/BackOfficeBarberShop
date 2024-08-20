import {
  faAddressCard, faBell, faFileLines, faStar,
} from '@fortawesome/free-regular-svg-icons'
import {
  faBug,

  faChartPie,

  faGauge,
  
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import { faTags } from '@fortawesome/free-solid-svg-icons';

import SidebarNavGroup from '@/components/Layout/Dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/components/Layout/Dashboard/Sidebar/SidebarNavItem'
import { getDictionary } from '@/locales/dictionary'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default async function SidebarNav() {
  const dict = await getDictionary()
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/">
        {dict.sidebar.items.dashboard}
      </SidebarNavItem>
      <SidebarNavTitle>{dict.sidebar.items.sales}</SidebarNavTitle>


     

      <SidebarNavItem icon={faChartPie} href="#">{dict.sidebar.items.charts}</SidebarNavItem>

      <SidebarNavGroup toggleIcon={faFileLines} toggleText={dict.sidebar.items.forms}>
        <SidebarNavItem href="#">{dict.sidebar.items.form_control}</SidebarNavItem>
     
      
      </SidebarNavGroup>
      <SidebarNavItem icon={faTags} href="Pages/brand">
    {dict.sidebar.items.brands}
</SidebarNavItem>
<SidebarNavItem icon={faTags} href="Pages/catalog">
    {dict.sidebar.items.catalog}
</SidebarNavItem>
<SidebarNavItem icon={faTags} href="Pages/product">
    {dict.sidebar.items.products}
</SidebarNavItem>


     


      <SidebarNavTitle>{dict.sidebar.items.extras}</SidebarNavTitle>


      <SidebarNavGroup toggleIcon={faStar} toggleText={dict.sidebar.items.pages}>
        <SidebarNavItem icon={faRightToBracket} href="login">{dict.sidebar.items.login}</SidebarNavItem>
        <SidebarNavItem icon={faAddressCard} href="register">{dict.sidebar.items.register}</SidebarNavItem>
        <SidebarNavItem icon={faBug} href="#">{dict.sidebar.items.error404}</SidebarNavItem>
        <SidebarNavItem icon={faBug} href="#">{dict.sidebar.items.error500}</SidebarNavItem>
      </SidebarNavGroup>


    </ul>
  )
}
