import { useEffect, useState } from "react"

const ITEMS_TO_LOAD = 50;
export type DataItem = {
  email: string,
  name: {
    title: string,
    first: string,
    last: string,
  }
  login: {
    username: string,
  }
}

export type Data = {
  results: DataItem[]
}

export const useDataLoader = () => {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://randomuser.me/api/?results=${ITEMS_TO_LOAD}`).then(res => res.json()).then((data) => {
      setData(data);
      setLoading(false);
    })
  }, [setData, setLoading])
  return {
    values: {data, loading},
  }
}
