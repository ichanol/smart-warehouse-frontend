import { CancelButton, RetryButton, SubmitButton } from '../components'

import { Container } from './OverviewStyle'
import React from 'react'

const Overview = () => {
  const lorem = `Elit elit deserunt ipsum Lorem nulla excepteur labore officia sit
  reprehenderit fugiat dolor culpa. Irure sunt amet nostrud nostrud
  magna sit ea consequat pariatur veniam exercitation. Magna ad
  eiusmod adipisicing ullamco consequat nisi. Non velit sit mollit
  fugiat nulla ut nostrud. Culpa ea irure veniam fugiat cupidatat amet
  fugiat ea. Sit qui voluptate laborum cillum eu officia nisi
  voluptate consectetur ad elit dolor est. Adipisicing magna aliquip
  occaecat eu aliquip magna laboris laboris. Eiusmod ullamco sunt
  reprehenderit amet consequat. Reprehenderit consectetur fugiat sunt
  non aliquip pariatur irure pariatur officia excepteur. Id elit sit
  fugiat ut velit. Nostrud excepteur minim esse commodo minim eiusmod
  velit exercitation. Lorem enim cupidatat cupidatat magna. Nisi qui
  adipisicing anim esse ex excepteur. Irure consequat mollit esse
  culpa duis sit occaecat magna sunt culpa ea amet nisi. Duis
  adipisicing ipsum labore cillum ex ut veniam anim qui irure ea
  occaecat incididunt. Sint do deserunt ut ad ut non enim mollit
  deserunt nisi elit. Ea dolor sint ut velit dolore nulla consequat.
  Dolore laborum adipisicing est ea deserunt incididunt non cillum
  sunt amet. Dolor pariatur amet in in. Nostrud sunt ullamco
  exercitation enim cillum qui nulla occaecat ad irure dolor. Sit
  officia pariatur et do veniam adipisicing enim aliquip deserunt eu.
  Sint do laborum aliqua labore. Ipsum quis esse et pariatur
  incididunt. Anim occaecat non exercitation qui aliquip eiusmod aute.
  Est anim laboris tempor consectetur cupidatat id mollit incididunt
  anim ex laboris in consequat sunt. Ea ullamco nostrud nulla laboris
  dolore. Cillum velit adipisicing labore commodo enim nostrud do
  commodo duis do non enim magna irure. In labore est duis aliquip
  deserunt id proident quis. Ut aliqua dolore elit anim esse cupidatat
  veniam sint do elit. Aliquip mollit duis commodo nisi in. Duis eu
  nisi ex do tempor mollit eu id dolore deserunt dolor id pariatur
  ipsum. Ipsum fugiat nulla ut aliqua amet anim minim esse ut
  consectetur amet nostrud fugiat. Eu nisi nulla mollit non amet. Ex
  enim amet veniam laborum ut cupidatat aliqua voluptate. Lorem
  pariatur esse excepteur nulla sint. Ea dolor commodo quis in
  exercitation. Eu veniam aliqua nostrud deserunt nostrud esse veniam
  elit. Ipsum pariatur eiusmod ut ipsum Lorem ullamco eiusmod sunt
  duis proident aliqua. Nulla esse et fugiat culpa labore cillum id
  dolor laboris consectetur reprehenderit laboris ipsum mollit. Ut
  deserunt cupidatat do occaecat do aliqua excepteur nostrud sint
  laborum amet exercitation in. In incididunt et consequat laboris
  voluptate in nulla magna adipisicing ut nulla culpa ad. Nisi
  incididunt laborum velit Lorem eu pariatur. Tempor amet culpa
  incididunt proident nisi irure enim et incididunt nostrud do
  aliquip. Dolor esse duis amet aute. Adipisicing elit nostrud nostrud
  reprehenderit esse. Lorem reprehenderit laborum ullamco Lorem Lorem
  minim ullamco consequat. Dolor et irure duis ad in. Duis eiusmod
  elit cillum est incididunt incididunt et sint cupidatat elit dolor.
  Exercitation consectetur non Lorem nisi irure irure. Exercitation
  nostrud laborum velit aute. Nisi aute deserunt duis fugiat cillum.
  Officia nisi ex ut anim. Nostrud laborum minim consectetur laboris
  dolore ex culpa et magna. Incididunt veniam consequat sint pariatur
  quis minim eiusmod pariatur esse nulla qui. Cillum minim
  exercitation exercitation consequat et minim sit qui aliquip id
  nulla. Elit elit deserunt ipsum Lorem nulla excepteur labore officia
  sit reprehenderit fugiat dolor culpa. Irure sunt amet nostrud
  nostrud magna sit ea consequat pariatur veniam exercitation. Magna
  ad eiusmod adipisicing ullamco consequat nisi. Non velit sit mollit
  fugiat nulla ut nostrud. Culpa ea irure veniam fugiat cupidatat amet
  fugiat ea. Sit qui voluptate laborum cillum eu officia nisi
  voluptate consectetur ad elit dolor est. Adipisicing magna aliquip
  occaecat eu aliquip magna laboris laboris. Eiusmod ullamco sunt
  reprehenderit amet consequat. Reprehenderit consectetur fugiat sunt
  non aliquip pariatur irure pariatur officia excepteur. Id elit sit
  fugiat ut velit. Nostrud excepteur minim esse commodo minim eiusmod
  velit exercitation. Lorem enim cupidatat cupidatat magna. Nisi qui
  adipisicing anim esse ex excepteur. Irure consequat mollit esse
  culpa duis sit occaecat magna sunt culpa ea amet nisi. Duis
  adipisicing ipsum labore cillum ex ut veniam anim qui irure ea
  occaecat incididunt. Sint do deserunt ut ad ut non enim mollit
  deserunt nisi elit. Ea dolor sint ut velit dolore nulla consequat.
  Dolore laborum adipisicing est ea deserunt incididunt non cillum
  sunt amet. Dolor pariatur amet in in. Nostrud sunt ullamco
  exercitation enim cillum qui nulla occaecat ad irure dolor. Sit
  officia pariatur et do veniam adipisicing enim aliquip deserunt eu.
  Sint do laborum aliqua labore. Ipsum quis esse et pariatur
  incididunt. Anim occaecat non exercitation qui aliquip eiusmod aute.
  Est anim laboris tempor consectetur cupidatat id mollit incididunt
  anim ex laboris in consequat sunt. Ea ullamco nostrud nulla laboris
  dolore. Cillum velit adipisicing labore commodo enim nostrud do
  commodo duis do non enim magna irure. In labore est duis aliquip
  deserunt id proident quis. Ut aliqua dolore elit anim esse cupidatat
  veniam sint do elit. Aliquip mollit duis commodo nisi in. Duis eu
  nisi ex do tempor mollit eu id dolore deserunt dolor id pariatur
  ipsum. Ipsum fugiat nulla ut aliqua amet anim minim esse ut
  consectetur amet nostrud fugiat. Eu nisi nulla mollit non amet. Ex
  enim amet veniam laborum ut cupidatat aliqua voluptate. Lorem
  pariatur esse excepteur nulla sint. Ea dolor commodo quis in
  exercitation. Eu veniam aliqua nostrud deserunt nostrud esse veniam
  elit. Ipsum pariatur eiusmod ut ipsum Lorem ullamco eiusmod sunt
  duis proident aliqua. Nulla esse et fugiat culpa labore cillum id
  dolor laboris consectetur reprehenderit laboris ipsum mollit. Ut
  deserunt cupidatat do occaecat do aliqua excepteur nostrud sint
  laborum amet exercitation in. In incididunt et consequat laboris
  voluptate in nulla magna adipisicing ut nulla culpa ad. Nisi
  incididunt laborum velit Lorem eu pariatur. Tempor amet culpa
  incididunt proident nisi irure enim et incididunt nostrud do
  aliquip. Dolor esse duis amet aute. Adipisicing elit nostrud nostrud
  reprehenderit esse. Lorem reprehenderit laborum ullamco Lorem Lorem
  minim ullamco consequat. Dolor et irure duis ad in. Duis eiusmod
  elit cillum est incididunt incididunt et sint cupidatat elit dolor.
  Exercitation consectetur non Lorem nisi irure irure. Exercitation
  nostrud laborum velit aute. Nisi aute deserunt duis fugiat cillum.
  Officia nisi ex ut anim. Nostrud laborum minim consectetur laboris
  dolore ex culpa et magna. Incididunt veniam consequat sint pariatur
  quis minim eiusmod pariatur esse nulla qui. Cillum minim
  exercitation exercitation consequat et minim sit qui aliquip id
  nulla.`
  return (
    <Container>
      <div className='header'>
        <span>Overview</span>
      </div>
      <div className='content'>
        <SubmitButton />
        <CancelButton />
        <RetryButton />
        {lorem}
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
 * ?       8.Add upload file [FE]
 * ?       11.Add profile preferences layout [FE]
 * *       12.Create weekly / monthly document report
 *
 *
 *
 *
 *
 * *  activity_log
 * *  ------------------------------------------------------
 * *  | id | user_id | activity_type | created_at | detail |
 * *  ------------------------------------------------------
 *
 * *  activity_type
 * !  login
 * !  logout
 * !  scan id card
 * !  import/export product
 * !  create new user information
 * !  create new product information
 * !  create new role information
 * !  update user information
 * !  update product information
 * !  update role information
 * !  edit / update transaction
 */
