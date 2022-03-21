import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [pictureList, setPictureList] = useState<string[]>([]);
  const [picturesLength, setPicturesLength] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  interface dataObj {
    id: string;
    author: string;
    download_url: string;
    height: number;
    width: number;
    url: string;
  }

  useEffect(() => {
    setIsLoading(true);
    const tempList: [] = [];
    axios.get('https://picsum.photos/v2/list').then((response: any) => {
      const data: dataObj[] = response.data;
      data.forEach((item: dataObj) => {
        const tempUrl: string[] = item.url.split('/');
        tempList.push(tempUrl[tempUrl.length - 1] as never);
      });
      setPictureList(tempList);
      setIsLoading(false);
    });
  }, []);

  const handleNext = () => {
    setPicturesLength((old: number) => old + 3);
  };

  return (
    <main>
      <div className="pictures">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          pictureList.slice(0, picturesLength).map((picture: string) => {
            return (
              <img
                src={`http://source.unsplash.com/${picture}`}
                key={picture}
                alt="somealt"
              ></img>
            );
          })
        )}
      </div>
      <button
        onClick={handleNext}
        className={`btn ${
          picturesLength > pictureList.length ? 'disabled' : ''
        }`}
      >
        Next
      </button>
    </main>
  );
}

export default App;
