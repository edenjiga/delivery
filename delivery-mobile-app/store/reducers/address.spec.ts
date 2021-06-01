import * as addressActions from '@/store/actions/address';
import { Address } from '@edenjiga/delivery-common';
import reducer from './address';

describe('Address reducer', () => {
  describe(`handle ${addressActions.setAddress}`, () => {
    it('should edit the button text, the text and the isvisible', () => {
      const data: Address = {
        name: 'name',
        note: 'note',
        nomenclature: 'nome',
        coordinates: {
          latitude: '70',
          longitude: '70',
        },
      };
      const action = addressActions.setAddress(data);

      const initialState = {
        name: '',
        note: '',
        nomenclature: '',
        coordinates: {
          latitude: '7',
          longitude: '7',
        },
      };

      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        ...data,
      });
    });
  });
});
