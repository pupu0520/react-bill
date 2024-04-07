import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useSelector } from 'react-redux'
import _ from 'lodash';
import { useMemo, useState } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import DailyBill from './components/day';

const Month = () => {
  const [showVisible, setVisible] = useState(false);
  const [showDate, setDate] = useState(dayjs().format('YYYY-MM'));

  const cancelTime = () => {
    setVisible(false);
  }
  const confirmTime = (val) => {
    setDate(dayjs(val).format('YYYY-MM'));
    setVisible(false);
  }


  const { billList } = useSelector(state => state.bill);
  const groupBill = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'));
  }, [billList]);


  const currentMonthBill = useMemo(() => {
    const val = groupBill?.[showDate] ?? [];
    const income = val.filter(item => item.type === 'income').reduce((a,c) => a + c.money, 0);
    const pay = val.filter(item => item.type === 'pay').reduce((a,c) => a + c.money, 0);
    return {
      income,
      pay,
      total: income + pay
    };
  }, [groupBill, showDate]);

  const monthDetailBill = useMemo(() => {
    const val = groupBill?.[showDate] ?? [];
    const group = _.groupBy(val, (item) => dayjs(item.date).format('YYYY-MM-DD'));
    return {
      keys: Object.keys(group),
      group,
    }
  },[groupBill, showDate])

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">
              {showDate}月账单
            </span>
            <span className={classNames('arrow', showVisible && 'expand')} onClick={() => setVisible(true)} ></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{currentMonthBill.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{currentMonthBill.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{currentMonthBill.total}</span>
              <span className="type">结余</span>
            </div>
          </div>

          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={showVisible}
            onCancel={() => cancelTime()}
            onConfirm={(val) => confirmTime(val)}
            onClose={() => cancelTime()}
            max={new Date()}
          />
        </div>
        {monthDetailBill.keys.map((dateKey) => (
          <DailyBill key={dateKey} curData={dateKey} dayBill={monthDetailBill.group[dateKey]}/>
        ))}
      </div>
    </div >
  )
}

export default Month