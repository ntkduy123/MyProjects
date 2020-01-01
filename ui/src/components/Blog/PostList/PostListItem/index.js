import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PostListItem = ({ data }) => {
  const {
    title, postCategory, description, image, id
  } = data
  return (
    <div className="gx-news-item">
      <div className="gx-news-thumb"><img className="gx-width-175 gx-rounded-lg" src={image} alt="..." /></div>
      <div className="gx-news-content">
        <h4 className="gx-mt-0">{title}</h4>
        <p className="gx-mb-2">{description}</p>
        <div className="gx-news-tags-row">
          <div className="gx-news-tags-left">
            <p className="gx-text-grey gx-mb-0">
              <i
                className="icon
                icon-tag-new gx-fs-lg gx-mr-2 gx-d-inline-flex gx-vertical-align-middle gx-text-light-grey"
              />
              {postCategory.name}
            </p>
          </div>
          <div className="gx-news-tags-right">
            <Link to={`/blog/post/${id}`} className="gx-text-primary gx-pointer gx-mb-0">
              {'Ready Full Story'}
              <i className="icon icon-long-arrow-right gx-fs-xl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

PostListItem.propTypes = {
  data: PropTypes.shape().isRequired
}

export default PostListItem
