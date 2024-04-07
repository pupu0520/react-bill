import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import {useDispatch} from 'react-redux'
import { fetchAddBillList } from '@/store/modules/bill'

const New = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 收入支出
  const [type, setType] = useState('pay');
  // 具体消费类型
  const [useFor, setUseFor] = useState('');

  // 金额
  const [money, setMoney] = useState(0.00);
  const changeMoney = (val) => {
    setMoney(val);
  }

  const [dateVisible, setDateVisible] = useState(false);
  const [date, setDate] = useState(dayjs()); 
  const changeDate = (val) => {
    setDate(val)
    setDateVisible(false);
  }

  const saveFun = () => {
    const data = {
      "type": type,
      "money": type === 'pay' ? -money : + money,
      "date": dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
      "useFor": useFor,
    }
    dispatch(fetchAddBillList(data)); 
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(type === 'pay' ? 'selected' : '')}
            onClick={() => setType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(type === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDateVisible(true)}>{date.format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                visible={dateVisible}
                max={new Date()}
                onConfirm={(val) => changeDate(val)}
                onClose={() =>  setDateVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={(val) => changeMoney(val)}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[type].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={() => saveFun()}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New;