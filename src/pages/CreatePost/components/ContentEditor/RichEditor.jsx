import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import BraftEditor from 'braft-editor';

import 'braft-editor/dist/braft.css';

export default class RichEditor extends Component {
  constructor(props) {
    super(props);

    this.editorInstance = null;

    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;
    // setState() is async...
    setTimeout(() => {
      if (this.props.value && this.editorInstance) {
        this.editorInstance.setContent(this.props.value, 'html');
        this.setState({ value: this.props.value });
      }
    }, 1000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = value => {
    if (this._isMounted) {
      this.setState({ value });
      this.props.onChange(value);
    }
  };

  handleRawChange = rawContent => {
    console.log(rawContent);
  };

  render() {
    const { value } = this.state;
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: value,
      onChange: this.handleChange,
      onRawChange: this.handleRawChange,
    };

    return (
      <div>
        <IceContainer>
          <BraftEditor
            {...editorProps}
            ref={instance => (this.editorInstance = instance)}
          />
        </IceContainer>
      </div>
    );
  }
}
