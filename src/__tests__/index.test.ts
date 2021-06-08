import Petra from './assets/petra.jpg';

describe('image-size-loader', () => {
  it('should be defined', () => {
    console.log('Petra', Petra);
    expect(Petra).toEqual('petra.jpg');
  });
});
