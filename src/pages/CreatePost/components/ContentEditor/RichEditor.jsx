import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import IceContainer from '@icedesign/container';
import BraftEditor from 'braft-editor';

import 'braft-editor/dist/braft.css'

export default class RichEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange = (value) => {
    this.setState({ value });
    this.props.onChange(value);
  }

  handleRawChange = (rawContent) => {
    //console.log(rawContent);
  }

  render() {
    const { value } = this.state;
    const editorProps = {
      height: 500,
      contentFormat: 'html',
      initialContent: value,
      onChange: this.handleChange,
      onRawChange: this.handleRawChange
    }

    return (
      <div>
        <IceContainer>
          <BraftEditor {...editorProps} />
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  editor: {
    minHeight: 200,
  },
};