import React, { ChangeEvent, Component } from 'react';

import styles from './profileStatus.module.scss';
import { ProfileStatusPropsType, StateType } from './types';

export class ProfileStatus extends Component<ProfileStatusPropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
    isOwner: this.props.isOwner,
  };

  componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>) {
    const { status } = this.props;

    if (prevProps.status !== status) {
      this.setState({
        status: status,
      });
    }
  }

  onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: event.currentTarget.value,
    });
  };

  deactivateEditMode = () => {
    const { updateStatus } = this.props;
    const { status } = this.state;

    this.setState({
      editMode: false,
    });

    updateStatus(status);
  };

  activateEditMode = () => {
    const { isOwner } = this.state;

    if (isOwner) {
      this.setState({
        editMode: true,
      });
    }
  };

  render() {
    const { status: propsStatus } = this.props;
    const { editMode, status: stateStatus } = this.state;

    return (
      <div>
        {!editMode ? (
          <div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <span
              className={styles.status}
              onClick={this.activateEditMode}
              role='button'
              tabIndex={0}
            >
              {propsStatus || 'Status is not set'}
            </span>
          </div>
        ) : (
          <div>
            <input
              autoFocus={true}
              className={styles.editStatus}
              onBlur={this.deactivateEditMode}
              onChange={this.onStatusChange}
              value={stateStatus}
            />
          </div>
        )}
      </div>
    );
  }
}
