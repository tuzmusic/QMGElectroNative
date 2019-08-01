// As of 8/1/19=, success responses aren't formatted as { code, message, data }
// My API errors are though; but I'm not mocking them here.
export const providerSuccess = {
  user_id: "1",
  username: "testuser",
  email: "testuser@bolt.com",
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
  user_id: "1",
  username: "testuser",
  email: "testuser@bolt.com",
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
