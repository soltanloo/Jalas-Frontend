import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

class Comments extends Component {
  renderComment = (comment) => (
    <Card style={{ margin: 5, backgroundColor: comment.reply ? '#e6e6e6' : 'white' }}>
      <CardHeader
        avatar={(
          <Avatar style={{ color: 'black' }}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          )}
        title={comment.commenterName}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {comment.containingText}
        </Typography>
        <br/>
        {comment.repliedComments.length > 0
          && comment.repliedComments.map((reply) => this.renderComment(reply))}
      </CardContent>
      <CardActions>
        <Button style={{ marginRight: 'auto' }} size="small">پاسخ‌دادن</Button>
      </CardActions>
    </Card>
  );

  render() {
    return (
      <div>
        <p>
          نظرات:
        </p>
        {this.props.comments.map((comment) => this.renderComment(comment))}
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
