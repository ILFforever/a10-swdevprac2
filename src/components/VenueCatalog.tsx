import Link from "next/link";
import Card from "./Card";

export default async function VenueCatalog({venuesJson}:{venuesJson:Promise<VenueJson>}) {

  const venuesData:VenueJson = await venuesJson;

    return (
      <>
        Explore {venuesData.count} venues in our catalog
        
        <div style={{margin:"20px", display:"flex", 
            flexDirection:"row", alignContent:"space-around", 
            justifyContent:"space-around", flexWrap:"wrap", padding:"10px"}}>
            {
                venuesData.data.map((venueItem:VenueItem)=>(
                    <Link href={`/venue/${venueItem.id}`} className="w-1/5" key={venueItem.id}>
                        <Card 
                          venueName={venueItem.name} 
                          imgSrc={venueItem.picture} 
                          />
                    </Link>
                ))
            }
        </div>
      </>
    )
  }