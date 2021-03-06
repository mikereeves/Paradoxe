import React from 'react';

import { ChatShareFileCardContainer } from '/imports/ui/containers/parts/chat/ChatShareFileCardContainer';

import '/imports/ui/styles/parts/chat/ChatShareFileComponentStyle.less';

export const ChatShareFilesComponent = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    message: React.PropTypes.object.isRequired,
  },
  render: function () {
    return (
      <div>
        <div className="ui cards share-files">
          {this.props.message.files.map(fileInfo =>
            <ChatShareFileCardContainer
              key={fileInfo.id}
              contact={this.props.contact}
              message={this.props.message}
              fileInfo={fileInfo}
             />
          )}
        </div>
      </div>
    );
  },
});
