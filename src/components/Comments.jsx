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
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
      replies: {},
      expanded: {},
    };
  }

  handleSubmitComment = () => {
    this.props.onSubmitComment(this.state.commentText);
  };

  handleSubmitReply = (parentId) => {
    this.props.onSubmitReply(parentId, this.state.replies[parentId]);
  };

  handleChangeReply = (parentId, event) => {
    const { replies } = this.state;
    this.setState({ replies: { ...replies, [parentId]: event.target.value } });
  };

  renderComment = (comment) => (
    <Card key={comment.id} style={{ margin: 5, backgroundColor: comment.reply ? '#e6e6e6' : 'white' }}>
      <CardHeader
        avatar={(
          <Avatar style={{ color: 'black' }}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          )}
        title={comment.commenterName}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p" style={{ whiteSpace: 'pre-wrap' }}>
          {comment.containingText}
        </Typography>
        <br />
        {comment.repliedComments.length > 0
          && comment.repliedComments.map((reply) => this.renderComment(reply))}
      </CardContent>
      <CardActions>
        <Button
          style={{ marginRight: 'auto' }}
          size="small"
          onClick={() => this.setState({ expanded: { ...this.state.expanded, [comment.id]: !this.state.expanded[comment.id] } })}
        >
          پاسخ‌دادن
        </Button>
        {this.props.hasPermToDelete(comment.commenterId)
          && (
          <Button
            size="small"
            color="secondary"
            onClick={() => this.props.onDeleteComment(comment.id)}
          >
            حذف
          </Button>
          )}
      </CardActions>
      <Collapse in={this.state.expanded[comment.id] ? this.state.expanded[comment.id] : false} timeout="auto" unmountOnExit>
        <CardContent>
          <TextField
            placeholder={'متن نظر'}
            multiline
            fullWidth
            value={this.state.replies[comment.id] ? this.state.replies[comment.id] : ''}
            onChange={(event) => this.handleChangeReply(comment.id, event)}
          />
        </CardContent>
        <CardActions>
          <Button
            style={{ marginRight: 'auto' }}
            size="small"
            onClick={() => this.handleSubmitReply(comment.id)}
          >
            ثبت پاسخ
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );

  render() {
    return (
      <div>
        <p>
          نظرات:
        </p>
        {this.props.comments.map((comment) => this.renderComment(comment))}
        <br />
        <div>
          <Card style={{ margin: 5, backgroundColor: 'lightcyan' }}>
            <CardContent>
              <Typography variant="body2" color="textPrimary" component="p">
                افزودن نظر جدید
              </Typography>
              <br />
              <TextField
                placeholder={'متن نظر'}
                multiline
                fullWidth
                value={this.state.commentText}
                onChange={(event) => this.setState({ commentText: event.target.value })}
              />
            </CardContent>
            <CardActions>
              <Button
                style={{ marginRight: 'auto' }}
                size="small"
                onClick={this.handleSubmitComment}
              >
                ثبت نظر
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
