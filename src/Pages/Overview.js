import { Container, Thumbnail } from './OverviewStyle'
import React, { useEffect, useRef, useState } from 'react'

import { Chart } from 'chart.js'
import clsx from 'clsx'
import io from 'socket.io-client'
import moment from 'moment'
import { requestHandler } from '../Services'

const Overview = () => {
  const socket = io.connect(process.env.REACT_APP_SOCKET_IO)

  const [activityLogState, setactivityLogState] = useState([])
  const [activityLogSocketState, setactivityLogSocketState] = useState([])

  const ctx = useRef([])

  const [graphData, setGraphData] = useState({})

  const getData = async () => {
    try {
      const {
        result: { topExportResult, topImportResult, activityLogs },
      } = await requestHandler('/dashboard', true, {}, 'get')
      setactivityLogState(activityLogs)
      setGraphData({ ...graphData, data: { topExportResult, topImportResult } })
      return { topExportResult, topImportResult }
    } catch (error) {
      console.log(error)
    }
  }

  const initialDashboardHandler = async () => {
    try {
      const data = (await getData()) || {}
      const topImportLabel = []
      const topImportData = []
      const topExportLabel = []
      const topExportData = []

      const x = data?.topImportResult?.map((value, index) => {
        topImportData.push(value.total)
        topImportLabel.push(value.product_name)
      })
      const y = data?.topExportResult?.map((value, index) => {
        topExportData.push(value.total)
        topExportLabel.push(value.product_name)
      })
      const topImportChart = new Chart(ctx?.current[0]?.getContext('2d'), {
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
      const topExportChart = new Chart(ctx?.current[1]?.getContext('2d'), {
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
    } catch (error) {}
  }

  useEffect(() => {
    initialDashboardHandler()
  }, [])

  useEffect(() => {
    socket.on('ACTIVITY_LOG', async ({ message, time, id, username }) => {
      const newActivity = {
        activity_id: id,
        activity_detail: message,
        created_at: time,
        username,
      }
      setactivityLogSocketState([...activityLogSocketState, newActivity])
    })
    return () => {
      socket.removeAllListeners()
      socket.disconnect()
    }
  })

  return (
    <Container>
      <div className='content'>
        <div className='activity-log-section'>
          <div className='header activity-log-header'>
            <span>Activity logs</span>
          </div>
          <div className='activity-log'>
            <div className='socket-wrapper'>
              {activityLogSocketState.map((value, index) => {
                return (
                  <div className='activity-log-information' key={index}>
                    <Thumbnail>
                      <span>{value.username[0]}</span>
                    </Thumbnail>
                    <div className='log-detail'>
                      <span>{value.activity_detail}</span>
                    </div>
                    <div className='timestamp'>
                      <span>{moment(value.created_at).fromNow()}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div>
              {activityLogState.map((value, index) => {
                const [time] = value.created_at.split('Z')
                return (
                  <div className='activity-log-information' key={index}>
                    <Thumbnail>
                      <span>{value.username[0]}</span>
                    </Thumbnail>
                    <div className='log-detail'>
                      <span>{value.activity_detail}</span>
                    </div>
                    <div className='timestamp'>
                      <span>{moment(time).fromNow()}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='graph-section'>
          <div className='header'>
            <span>Overview</span>
          </div>
          <div className='chart-section'>
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
