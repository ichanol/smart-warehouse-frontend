import { CancelButton, RetryButton, SubmitButton } from '../components'
import React, { useEffect, useRef, useState } from 'react'

import { Chart } from 'chart.js'
import { Container } from './OverviewStyle'
import { requestHandler } from '../Services'

const Overview = () => {
  const ctx = useRef([])

  const [graphData, setGraphData] = useState({})

  //data.topExportResult => [{total, product_name}]
  //data.topImportResult => [{total, product_name}]

  const getData = async () => {
    try {
      const { result } = await requestHandler('/dashboard', true, {}, 'get')
      setGraphData({ ...graphData, data: result })
      return result
    } catch (error) {
      console.log(error)
    }
  }

  const initialDashboardHandler = async () => {
    const data = await getData()
    const topImportLabel = []
    const topImportData = []
    const topExportLabel = []
    const topExportData = []

    data.topImportResult.map((value, index) => {
      if (index < 5) {
        topImportData.push(value.total)
        topImportLabel.push(value.product_name)
      }
    })
    data.topExportResult.map((value, index) => {
      if (index < 5) {
        topExportData.push(value.total)
        topExportLabel.push(value.product_name)
      }
    })
    const topImportChart = new Chart(ctx.current[0].getContext('2d'), {
      type: 'bar',
      data: {
        labels: topImportLabel,
        datasets: [
          {
            label: 'Top 5 Import product',
            data: topImportData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255, 0.4)',
              'rgba(255, 159, 64, 0.4)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: { display: true, position: 'top', align: 'center' },
      },
    })
    const topExportChart = new Chart(ctx.current[1].getContext('2d'), {
      type: 'bar',
      data: {
        labels: topExportLabel,
        datasets: [
          {
            label: 'Top 5 Export product',
            data: topExportData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255, 0.4)',
              'rgba(255, 159, 64, 0.4)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: { display: true, position: 'top', align: 'center' },
      },
    })
  }

  useEffect(() => {
    initialDashboardHandler()
  }, [])

  return (
    <Container>
      <div className='content'>
        <div className='activity-log-section'>
          <div className='header activity-log-header'>
            <span>Activity logs</span>
          </div>
          <div className='activity-log'>
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
            <div className='activity-log-information' />
          </div>
        </div>
        <div className='graph-section'>
          <div className='header'>
            <span>Overview</span>
          </div>
          <div className='chart'>
            <canvas
              ref={(ref) => {
                ctx.current[0] = ref
              }}
            />
          </div>
          <div className='chart'>
            <canvas
              ref={(ref) => {
                ctx.current[1] = ref
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Overview

/**
 * TODO:
 *
 * ?       4.Add Activity log [FE][BE]
 * ?       5.Add user's login handler (forget password/username) [FE][BE]
 * ?       6.Add Reset password via email [FE][BE]
 * ?       7.Add schedul job [BE]
 * ?       11.Add profile preferences layout [FE]
 * *       12.Create weekly / monthly document report
 */
