// import { createTestContext, TestContext } from 'nexus/testing'
import { createTestContext } from './__helpers'

let ctx = createTestContext();

// beforeAll(async () => {
//   await ctx.app.server.start()
// }) 

// afterAll(async () => {
//   await ctx.app.server.stop()
// })


it('Testing jest config', async () => {
  expect(true).toEqual(true);
})
