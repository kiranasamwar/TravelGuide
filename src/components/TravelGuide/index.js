import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelGuideCard from '../TravelGuideCard'

import {
  TravelGuideMainContainer,
  HeadingContainer,
  MainHeading,
  LoaderContainer,
  UnOrderList,
} from './styledComponents'

class TravelGuide extends Component {
  state = {
    guideList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getGuideList()
  }

  getGuideList = async () => {
    // const {guideList} = this.state
    this.setState({
      isLoading: true,
    })

    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const upDatedData = data.packages.map(location => ({
        id: location.id,
        name: location.name,
        imageUrl: location.image_url,
        description: location.description,
      }))
      this.setState({
        guideList: upDatedData,
        isLoading: false,
      })
    }
  }

  renderSuccessMethod = () => {
    const {guideList} = this.state

    return (
      <UnOrderList>
        {guideList.map(eachItem => (
          <TravelGuideCard travelDetails={eachItem} key={eachItem.id} />
        ))}
      </UnOrderList>
    )
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoaderContainer>
  )

  render() {
    const {isLoading} = this.state
    return (
      <TravelGuideMainContainer>
        <HeadingContainer>
          <MainHeading>Travel Guide</MainHeading>
        </HeadingContainer>
        {isLoading ? this.renderLoader() : this.renderSuccessMethod()}
      </TravelGuideMainContainer>
    )
  }
}

export default TravelGuide
