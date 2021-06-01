import * as modalActions from '@/store/actions/modal';
import { IModalState } from '@/types';
import reducer from './modal';

describe('Modal reducer', () => {
  describe(`handle ${modalActions.setModalState}`, () => {
    it('should edit the button text, the text and the isvisible', () => {
      const data: IModalState = {
        buttonText: 'sometext',
        text: 'text',
        isVisible: true,
      };
      const action = modalActions.setModalState(data);

      const initialState: IModalState = {
        buttonText: '',
        text: '',
        isVisible: false,
      };

      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        ...data,
      });
    });
  });

  describe(`handle ${modalActions.setModalIsVisibleState}`, () => {
    it('should set isVisible ', () => {
      const action = modalActions.setModalIsVisibleState(true);
      const initialState: IModalState = {
        buttonText: '',
        text: '',
        isVisible: false,
      };
      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        isVisible: true,
      });
    });
  });
});
