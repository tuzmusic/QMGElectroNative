// As of 8/1/19=, success responses aren't formatted as { code, message, data }
// My API errors are though; but I'm not mocking them here.
export const providerSuccess = {
  user_id: "21",
  username: "apitest3",
  email: "apitest3@electro.com",
  subscriptions: [
    {
      id: "17",
      subscription_plan_id: "986",
      start_date: "2019-08-01 00:00:00",
      expiration_date: "0000-00-00 00:00:00",
      status: "active",
      payment_profile_id: ""
    }
  ]
};

export const userSuccess = {
  user_id: "22",
  username: "apitest4",
  email: "apitest4@electro.com",
  subscriptions: [
    {
      id: "18",
      subscription_plan_id: "988",
      start_date: "2019-08-01 00:00:00",
      expiration_date: "0000-00-00 00:00:00",
      status: "active",
      payment_profile_id: ""
    }
  ]
};

export const regSuccess = {
  status: "ok",
  cookie:
    "apitest3|1565900622|HoQO4FE83yBPxqTybwVZ8lNIuaOwLndjYAvQjYZbSMu|e14b5b77545a04aa50cf962c604386d12731b16d43b90e0af6d77c430601ac92",
  user_id: 21
};
