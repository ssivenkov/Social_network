import { create } from 'react-test-renderer';

import { updateStatus } from 'store/reducers/profileReducer/profileReducer';

import { ProfileStatus } from './ProfileStatus';

describe('profileStatus component', () => {
  test('status from props should be in the state', () => {
    const component = create(
      <ProfileStatus isOwner={false} status='test text' updateStatus={updateStatus} />,
    );
    const instance = component.root;

    expect(instance.props.status).toBe('test text');
  });

  test('after creation span should be displayed', () => {
    const component = create(
      <ProfileStatus isOwner={false} status='test text' updateStatus={updateStatus} />,
    );
    const instance = component.root;
    const span = instance.findByType('span');

    expect(span).not.toBeNull();
  });

  test("after creation input shouldn't be displayed", () => {
    const component = create(
      <ProfileStatus isOwner={false} status='test text' updateStatus={updateStatus} />,
    );
    const instance = component.root;

    expect(() => {
      instance.findByType('input');
    }).toThrow();
  });

  test('after creation span should be contains correct text', () => {
    const component = create(
      <ProfileStatus isOwner={false} status='test text' updateStatus={updateStatus} />,
    );
    const instance = component.root;
    const span = instance.findByType('span');

    expect(span.children[0]).toBe('test text');
  });

  test('input should be displayed in edit mode instead of span', () => {
    const component = create(
      <ProfileStatus isOwner={true} status='test text' updateStatus={updateStatus} />,
    );
    const instance = component.root;

    console.log(instance);
    const span = instance.findByType('span');

    span.props.onClick();
    const input = instance.findByType('input');

    expect(input.props.value).toBe('test text');
  });

  test('callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus isOwner={false} status='test text' updateStatus={mockCallback} />,
    );
    const instance = component.getInstance();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
