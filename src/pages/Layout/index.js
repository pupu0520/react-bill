import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBillList } from "@/store/modules/bill";
import { useNavigate } from "react-router-dom";
import './index.scss'

import { TabBar } from 'antd-mobile'
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline
} from 'antd-mobile-icons'

const Layout = () => {
  const tabs = [
    {
      key: '/',
      title: '月度账单',
      icon: <BillOutline />,
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />,
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline />,
    }
  ];
  const navigate = useNavigate();

  const setRouteActive = (val) => {
    navigate(val);
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBillList());
  }, [dispatch])
  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={value => setRouteActive(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout;