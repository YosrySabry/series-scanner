interface Show {
    id: number;
    name: string;
    image: {
      medium: string;
      original?: string;
    };
    summary?: string;
    genres?: string[];
    premiered?: string;
  }
  
  interface ShowResult {
    show: Show;
  }
  