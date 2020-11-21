import faker from "faker";

export const generateData = amount => {

  const data = [];
  const dataJobs = [];
  const dataStates = [];

  for (let i = 0; i < amount; i++){
    const newData = {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      title: faker.name.title(),
      job: faker.name.jobType(),
      state: faker.address.stateAbbr()
    }

    if (!dataJobs.includes(newData.job))
      dataJobs.push(newData.job)

    if (!dataStates.includes(newData.state))
      dataStates.push(newData.state)

    data.push(newData);

    dataJobs.sort()
    dataStates.sort()
  }

  return {data, dataJobs, dataStates};
}