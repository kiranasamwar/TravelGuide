import {Name, Image, Description, TravelList} from './styledComponents'

const TravelGuideCard = props => {
  const {travelDetails} = props
  const {description, imageUrl, name} = travelDetails

  return (
    <TravelList>
      <Image src={imageUrl} alt={name} />
      <Name>{name}</Name>
      <Description>{description}</Description>
    </TravelList>
  )
}

export default TravelGuideCard
