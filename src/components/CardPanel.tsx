'use client'
import { useState } from "react"
import Card from "./Card"
import Link from "next/link"

export default function CardPanel(){
    const [ratings, setRatings] = useState<Map<string, number>>(new Map());
    
    const handleRatingChange = (venueName: string, rating: number) => {
        setRatings(prev => {
            const newRatings = new Map(prev);
            newRatings.set(venueName, rating);
            return newRatings;
        });
    };
    
    const handleRemoveRating = (venueName: string) => {
        setRatings(prev => {
            const newRatings = new Map(prev);
            newRatings.delete(venueName);
            return newRatings;
        });
    };

    const mockVenueRepo = [
        {vid:"001", name:"The Bloom Pavilion", image:"/img/bloom.jpg"},
        {vid:"002", name:"Spark Space", image:"/img/sparkspace.jpg"},
        {vid:"003", name:"The Grand Table", image:"/img/grandtable.jpg"}
    ];

    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                {mockVenueRepo.map((venue) => (
                    <Card 
                        key={venue.vid}
                        venueName={venue.name} 
                        imgSrc={venue.image} 
                        // venueId={venue.vid}
                        // onCompare={(venue: string, rating: number) => handleRatingChange(venue, rating)}
                    />
                ))}
            </div>

            <div className="mt-6 mx-auto p-4 bg-white rounded-lg shadow max-w-2xl">
                <h2 className="text-xl font-medium mb-4">Venue List with Ratings: {ratings.size}</h2>
                {Array.from(ratings).map(([venueName, rating]) => (
                    <div 
                        key={venueName} 
                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                        onClick={() => handleRemoveRating(venueName)}
                        data-testid={venueName}
                    >
                        {venueName} Rating: {rating}
                    </div>
                ))}
            </div>
        </div>
    );
}