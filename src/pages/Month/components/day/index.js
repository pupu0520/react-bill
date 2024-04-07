import classNames from 'classnames'
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import './index.scss'
import {billTypeToName} from '@/contants'
import Icon from '@/components/Icon';

const DailyBill = ({dayBill, curData }) => {
  const curDayBill = useMemo(() => {
    const income = dayBill.filter(item => item.type === 'income').reduce((a,c) => a + c.money, 0);
    const pay = dayBill.filter(item => item.type === 'pay').reduce((a,c) => a + c.money, 0);
    return {
      income,
      pay,
      total: income + pay
    };
  }, [dayBill]);
  const [showDetail, setShowDetail] = useState(true);
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{dayjs(curData).format('MM-DD')}</span>
          <span className={classNames('arrow', showDetail && 'expand')} onClick={() => setShowDetail(!showDetail)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{curDayBill.pay}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{curDayBill.income}</span>
          </div>
          <div className="balance">
            <span className="money">{curDayBill.total}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className={classNames('billList')} style={{'display': showDetail && 'none'}}>
        {dayBill.map(item => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor}></Icon>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill