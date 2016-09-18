import React from 'react';

import { AvatarComponent } from '/imports/ui/components/parts/user/AvatarComponent';

import '/imports/ui/styles/parts/app/sidebar/SidebarContactItemComponentStyle.less';

export const SidebarContactItemComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    contact: React.PropTypes.object.isRequired,
    contactStatus: React.PropTypes.string.isRequired,
    userHasBlockedContact: React.PropTypes.bool.isRequired,
    newMessages: React.PropTypes.array,
    incomingCall: React.PropTypes.array,
    outgoingCall: React.PropTypes.array,
    videoCall: React.PropTypes.array,
    openChat: React.PropTypes.func.isRequired,
  },
  componentDidMount: function () {
    this.initTooltips();
  },
  componentDidUpdate: function () {
    this.initTooltips();
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.newMessages && this.props.newMessages.length !== 0) {
      if (nextProps.newMessages.length > this.props.newMessages.length) {
        this.replaySound(this.refs.messages);
      }
    }
  },
  replaySound: function (audio) {
    audio.currentTime = 0;
    audio.play();
  },
  render: function () {
    const blockedIcon = this.props.userHasBlockedContact ?
      <i className="red dont icon" data-content="Blocked"/> : null;

    const totalNewMessages = this.props.newMessages.length;
    const newMessagesTooltip = `${totalNewMessages} new message${totalNewMessages > 1 ? 's' : ''}`;
    const newMessagesIcon = totalNewMessages ?
      <i className="mail icon" data-content={newMessagesTooltip}>
        <audio src="/sounds/message.mp3" autoPlay hidden ref="messages"/>
      </i> : null;

    const incomingCallIcon = this.props.incomingCall.length ?
      <i className="green record icon" data-content="Incoming call">
        <audio src="/sounds/incoming.mp3" autoPlay hidden loop/>
      </i> : null;

    const outgoingCallIcon = this.props.outgoingCall.length ?
      <i className="blue record icon" data-content="Outgoing call">
        <audio src="/sounds/outgoing.ogg" autoPlay hidden loop/>
      </i>: null;

    const videoCallIcon = this.props.videoCall.length ?
      <i className="record icon" data-content="Video call" /> : null;

    return (
      <div className="item" onClick={this.props.openChat}>
        <span className={`user-status mini ui empty circular label ${this.props.contactStatus}`}/>
        <AvatarComponent user={this.props.contact} className={"ui avatar image"} size={22}/>
        <div className="content">
          <div className="header" ref="header">
            {this.props.contact.username}
            {blockedIcon}
            {newMessagesIcon}
            {incomingCallIcon}
            {outgoingCallIcon}
            {videoCallIcon}
          </div>
        </div>
      </div>
    );
  },
  initTooltips: function () {
    $(this.refs.header).find('[data-content]').popup({
      context: '#popups',
      inverted: true,
      position: 'right center',
      variation: 'mini',
    });
  },
});