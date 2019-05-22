import React from 'react'
import potrait from 'assets/images/potrait.jpg'


const PlainListItem = ({
  title,
  description,
  category
}) => {
  return (
    <div className="gx-user-list">
      <img alt="avatar" src={potrait} className="gx-avatar-img gx-avatar-img-lg gx-border-0"/>
      <div className="gx-description">
        <h3>{title}</h3>
        <h5>in <span className="gx-link">{category}</span></h5>
        <p className="gx-mb-1">{description}</p>
        <ul className="gx-list-inline gx-btn-list">
          <li>
            <span className="gx-link gx-meta-like">
              <i className="icon icon-like-o gx-text-red"/>
              24
            </span>
          </li>
          <li>
            <span className="gx-link gx-meta-comment">
              <i className="icon icon-chat-new"/>
              2
            </span>
          </li>
        </ul>
      </div>
    </div>

  )
}

export default PlainListItem
