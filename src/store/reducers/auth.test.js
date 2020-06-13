import reducer from './auth';
import * as actionTypes from '../actions/actions';

describe('auth reducer',()=>{
        it('should return the initState',()=>{
            expect(reducer(undefined,{}))
            .toEqual({
                token: null,
                userId: null,
                error: null,
                loading: false,
            });
        })
        it('should store token after login',()=>{
            expect(reducer(
            {   token: null,
                userId: null,
                error: null,
                loading: false,
            },{
                type:actionTypes.AUTH_SUCCESS,
                idToken:'some-token',
                userId:'does-not-matter'
            }))
            .toEqual({
                token: 'some-token',
                userId: 'does-not-matter',
                error: null,
                loading: false,
            })
        })
});