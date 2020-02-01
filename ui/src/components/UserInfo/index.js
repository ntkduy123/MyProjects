import React from 'react'
import { Avatar, Popover } from 'antd'
import PropTypes from 'prop-types'

const UserInfo = ({ signOut }) => {
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      {/* eslint-disable-next-line */}
      <li onClick={signOut}>Logout</li>
    </ul>
  )
  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={userMenuOptions}
      trigger="click"
    >
      <Avatar
        src="https://via.placeholder.com/150x150"
        className="gx-avatar gx-pointer"
        alt=""
      />
    </Popover>
  )
}

UserInfo.propTypes = {
  signOut: PropTypes.func.isRequired
}

export default UserInfo
