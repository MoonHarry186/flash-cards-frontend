import React, { useContext, useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { GlobalContext } from '../context/GlobalState'
import Card from './Card'
import { coursesQuery } from '../utils/data'
import { client } from '../client'
import { Link } from 'react-router-dom'
const Home = () => {
  const context = useContext(GlobalContext)
  const [coursesList, setCoursesList] = useState([])
  useEffect(() => {
    if (coursesQuery) {
      client.fetch(coursesQuery).then((data) => {
        setCoursesList(data);
      });
    }
  }, [])
  return (
    <Layout>
      <div className="containter mx-auto">
        {coursesList.length > 0 && coursesList.map((course) => (
          <Link key={course._id} to={`/course/${course._id}`}>{course.name} </Link>
        ))}
      </div>
    </Layout>
  )
}

export default Home
