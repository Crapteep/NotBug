import { from } from 'rxjs';
import { filter, map, mergeMap, toArray, reduce } from 'rxjs/operators';

let persons = [
    { id: 1, name: "Jan Kowalski" },
    { id: 2, name: "John Doe" },
    { id: 3, name: "Jarek Kaczka" }
];

let ages = [
    { person: 1, age: 18 },
    { person: 2, age: 24 },
    { person: 3, age: 666 }
];

let locations = [
    { person: 1, country: "Poland" },
    { person: 3, country: "Poland" },
    { person: 1, country: "USA" }
];

from(locations).pipe(

    filter(location => location.country === "Poland"),
    map(location => location.person),

    toArray(),
    map(personIds => [...new Set(personIds)]),

    mergeMap(personIds => 
        from(personIds).pipe(
            mergeMap(personId => 
                from(ages).pipe(
                    filter(ageRecord => ageRecord.person === personId),
                    map(ageRecord => ageRecord.age)
                )
            ),
            toArray()
        )
    ),

    map(ages => {
        const totalAge = ages.reduce((sum, age) => sum + age, 0);
        return totalAge / ages.length;
    })
).subscribe(avgAge => {
    console.log("avg of age persons which living in Poland is:", avgAge);
});
