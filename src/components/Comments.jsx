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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEditDialog: false,
      commentText: '',
      replies: {},
      expanded: {},
      editing: {
        value: '',
        id: undefined,
      },
    };
  }

  handleSubmitComment = () => {
    this.props.onSubmitComment(this.state.commentText);
    this.setState({ commentText: '' });
  };

  handleSubmitReply = (parentId) => {
    this.props.onSubmitReply(parentId, this.state.replies[parentId]);
    this.setState({ expanded: { ...this.state.expanded, [parentId]: false }, replies: { ...this.state.replies, [parentId]: '' } });
  };

  handleChangeReply = (parentId, event) => {
    const { replies } = this.state;
    this.setState({ replies: { ...replies, [parentId]: event.target.value } });
  };

  handleEditComment = (event) => {
    this.setState({ editing: { ...this.state.editing, value: event.target.value } });
  };

  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false, editing: { value: '', id: undefined } });
  };

  handleOpenEditDialog = (commentId, commentText) => {
    this.setState({ openEditDialog: true, editing: { value: commentText, id: commentId } });
  };

  handleSubmitEdit = () => {
    this.handleCloseEditDialog();
    this.props.onEditComment({ text: this.state.editing.value, commentId: this.state.editing.id });
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
        {this.props.hasPermToEdit(comment.commenterId)
        && (
          <Button
            size="small"
            color="primary"
            onClick={() => this.handleOpenEditDialog(comment.id, comment.containingText)}
          >
            ویرایش
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
          <Dialog open={this.state.openEditDialog} onClose={this.handleCloseEditDialog}>
            <DialogTitle id="form-dialog-title">ویرایش نظر</DialogTitle>
            <DialogContent>
              <TextField
                value={this.state.editing.value}
                multiline
                autoFocus
                margin="dense"
                id="comment-edit"
                label="متن نظر"
                type="text"
                fullWidth
                onChange={(event) => this.handleEditComment(event)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseEditDialog}>
                لغو
              </Button>
              <Button onClick={this.handleSubmitEdit} color="primary">
                ثبت
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
