import { useSendOrder } from './useSendOrder'
import { checkoutFormApi } from '../../api/api'
import type { Order } from '@/entities/Order'
import type { ServerResponse } from '../types/types'

jest.mock('../../api/api', () => ({
  checkoutFormApi: {
    placeOrder: jest.fn(),
  },
}))

const mockedPlaceOrder = checkoutFormApi.placeOrder as jest.MockedFunction<
  typeof checkoutFormApi.placeOrder
>

const mockOrder: Order = {
  address: '456 Elm St',
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+9876543210',
  dishes: 'sushi',
  amount: 40.0,
  comments: '',
  userId: 7,
}

const mockResponse: ServerResponse = {
  data: {
    id: 2,
    address: '456 Elm St',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+9876543210',
    dishes: 'sushi',
    amount: 40.0,
    comments: '',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
    publishedAt: '2024-02-01T00:00:00.000Z',
    documentId: 'xyz789',
  },
  meta: {},
}

describe('useSendOrder', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedPlaceOrder.mockResolvedValue(mockResponse)
  })

  it('returns a function', () => {
    const sendOrder = useSendOrder()
    expect(typeof sendOrder).toBe('function')
  })

  it('delegates to checkoutFormApi.placeOrder with the given order', async () => {
    const sendOrder = useSendOrder()
    await sendOrder(mockOrder)
    expect(mockedPlaceOrder).toHaveBeenCalledWith(mockOrder)
    expect(mockedPlaceOrder).toHaveBeenCalledTimes(1)
  })

  it('returns the server response from checkoutFormApi.placeOrder', async () => {
    const sendOrder = useSendOrder()
    const result = await sendOrder(mockOrder)
    expect(result).toBe(mockResponse)
  })

  it('propagates errors from checkoutFormApi.placeOrder', async () => {
    mockedPlaceOrder.mockRejectedValue(new Error('Server error'))
    const sendOrder = useSendOrder()
    await expect(sendOrder(mockOrder)).rejects.toThrow('Server error')
  })

  it('each call to useSendOrder returns an independent function', async () => {
    const sendOrder1 = useSendOrder()
    const sendOrder2 = useSendOrder()
    await sendOrder1(mockOrder)
    await sendOrder2(mockOrder)
    expect(mockedPlaceOrder).toHaveBeenCalledTimes(2)
  })
})
