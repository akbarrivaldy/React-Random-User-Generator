import React from "react"

import Image from "./Image"
import Name from "./Name"
import Gender from "./Gender"
import Address from "./Adress"
import Birth from "./Birth"
import Email from "./Email"

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: [],
      loading: true,
    }
  }

  async fetchData() {
    await fetch("https://randomuser.me/api/?results=1")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userData: data.results })
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  refreshPage() {
    window.location.reload(false)
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  render() {
    return (
      <div>
        {this.state.userData.map((person) => (
          <div>
            <Image src={person.picture.large} alt="profile-img" />
            <Name first={person.name.first} last={person.name.last} />
            <Birth>{person.dob.date.slice(0, 10)}</Birth>
            <Gender gender={this.capitalizeFirstLetter(person.gender)} />
            <Address>
              {person.location.street.name} {person.location.street.number},{" "}
              {person.location.city} City, {person.location.country}{" "}
              {person.location.postcode}
            </Address>
            <Email email={person.email} />
            <button onClick={this.refreshPage}>Generate</button>
          </div>
        ))}
      </div>
    )
  }
}

export default Content
