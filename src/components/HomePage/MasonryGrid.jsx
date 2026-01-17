import { useState, useEffect } from 'react';
import PinCard from './PinCard';
import axios from 'axios'; 
import Loader from '../Loader';
import axiosInstance from '../../utils/api';
import Header from './Header';

const samplePins = [
  {
    id: 1,
    title: 'Modern Architecture Design',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'John Smith',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 2,
    title: 'Minimalist Interior',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Sarah Johnson',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 3,
    title: 'Urban Photography',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Mike Davis',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 4,
    title: 'Nature Landscape',
    image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Emma Wilson',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 5,
    title: 'Coffee Time',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Chris Brown',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 6,
    title: 'Vintage Camera',
    image: 'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Lisa Anderson',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 7,
    title: 'Workspace Setup',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Tom Martinez',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 8,
    title: 'Abstract Art',
    image: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Rachel Green',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 9,
    title: 'City Lights',
    image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Kevin Lee',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 10,
    title: 'Fashion Style',
    image: 'https://images.pexels.com/photos/291759/pexels-photo-291759.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Anna Taylor',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 11,
    title: 'Beach Sunset',
    image: 'https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'David White',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 12,
    title: 'Food Photography',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Sophie Clark',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 13,
    title: 'Mountain Adventure',
    image: 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Mark Thompson',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 14,
    title: 'Tech Gadgets',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Julia Roberts',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 15,
    title: 'Floral Design',
    image: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Oliver King',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 16,
    title: 'Street Art',
    image: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Nina Scott',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 17,
    title: 'Cozy Reading',
    image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Peter Parker',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 18,
    title: 'Fitness Goals',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Grace Miller',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 19,
    title: 'Travel Destinations',
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Henry Ford',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  },
  {
    id: 20,
    title: 'Pet Portraits',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
    author: 'Lily Chen',
    link: 'https://pexels.com',
    domain: 'pexels.com'
  }
];

function MasonryGrid() {
  const [filteredPins, setFilteredPins] = useState(samplePins);
  const [novels,setNovels] = useState(null)
  const [metaData,setMetaData] = useState(null)

  // useEffect(() => {
  //   if (searchQuery.trim() === '') {
  //     setFilteredPins(samplePins);
  //   } else {
  //     const filtered = samplePins.filter(pin =>
  //       pin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       pin.author.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setFilteredPins(filtered);
  //   }
  // }, [searchQuery]);
  useEffect( ()=>{    
    axiosInstance.get('/api/novel-content')
    .then((response)=>{
      if (response.data.results.length > 0){
          setMetaData(response.data.extra_data)
          setNovels(response.data.results)
        }
      else{
        setNovels([])
      }
})

    // ...

},[])


  if (!novels) return <Loader/>
  

  return (<>
    <Header meta_data={metaData}/>
    <div className="  max-w-7xl mx-auto px-4 py-6">
      {filteredPins.length > 0 ? (
        <div className=" grid grid-cols-3 md:flex lg:pl-12 md:flex-wrap  gap-4">
          {novels.map(novel => (
            <PinCard key={novel.id} novel={novel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No results found for "{searchQuery}"</p>
          <p className="text-gray-600 text-sm mt-2">Try different keywords</p>
        </div>
      )}
    </div>
    </>
  );
}

export default MasonryGrid;
