import React from "react";
import { UserStatus, WeatherType } from "../../models/home"
import AppContext from "../../contexts/homeContext"
import TimeInfo from "../../components/timeInfo"

interface IPosition {
  left: number;
  x: number;
}

const defaultPosition = (): IPosition => ({
  left: 0,
  x: 0
});


interface IScrollableComponentState {
  grabbing: boolean;
  position: IPosition;
}

interface IScrollableComponentProps {
  children: any;
  className?: string;
  id?: string;
}

const ScrollableComponent: React.FC<IScrollableComponentProps> = (props: IScrollableComponentProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [state, setStateTo] = React.useState<IScrollableComponentState>({
    grabbing: false,
    position: defaultPosition()
  });

  const handleOnMouseDown = (e: any): void => {
    setStateTo({
      ...state,
      grabbing: true,
      position: {
        x: e.clientX,
        left: ref.current?.scrollLeft ?? 0
      }
    });
  }

  const handleOnMouseMove = (e: any): void => {
    if (state.grabbing) {
      const left: number = Math.max(0, state.position.left + (state.position.x - e.clientX));
      (ref.current) && (ref.current.scrollLeft = left);
    }
  }

  const handleOnMouseUp = (): void => {
    if (state.grabbing) {
      setStateTo({ ...state, grabbing: false });
    }
  }

  return (
    <div
      ref={ref}
      className={`scrollable-component ${props.className}`}
      id={props.id}
      onMouseDown={handleOnMouseDown}
      onMouseMove={handleOnMouseMove}
      onMouseUp={handleOnMouseUp}
      onMouseLeave={handleOnMouseUp}
    >
      {props.children}
    </div>
  );
}

const Reminder: React.FC = () => {
  return (
    <div className="reminder">
      <div className="reminder-icon">
        <i className="fa-regular fa-bell" />
      </div>
    </div>
  )
}


interface IMenuSectionProps {
  children: any;
  icon: string;
  id: string;
  scrollable?: boolean;
  title: string;
}

const MenuSection: React.FC<IMenuSectionProps> = (props: IMenuSectionProps) => {
  const getContent = (): JSX.Element => {
    if (props.scrollable) {
      return (
        <ScrollableComponent className="menu-section-content">
          {props.children}
        </ScrollableComponent>
      );
    }

    return (
      <div className="menu-section-content">
        {props.children}
      </div>
    );
  }

  return (
    <div id={props.id} className="menu-section">
      <div className="menu-section-title">
        <i className={props.icon} />
        <span className="menu-section-title-text">{props.title}</span>
      </div>
      {getContent()}
    </div>
  )
}

const QuickNav: React.FC = () => {
  const getItems = (): JSX.Element[] => {
    return [
      { id: 1, label: "前端哲学家" },
      { id: 2, label: "爬虫界萌新" },
      { id: 3, label: "反编译萌新" },
      { id: 4, label: "Ctrl C+V 专家" },
    ].map((item: any) => {
      return (
        <div key={item.id} className="quick-nav-item clear-button">
          <span className="quick-nav-item-label">{item.label}</span>
        </div>
      );
    })
  }

  return (
    <ScrollableComponent id="quick-nav">
      {getItems()}
    </ScrollableComponent>
  );
}

const Weather: React.FC = () => {
  const getDays = (): JSX.Element[] => {
    return [{
      id: 1,
      name: "周一",
      temperature: "上班，认真工作",
      weather: WeatherType.Sunny
    }, {
      id: 2,
      name: "周二",
      temperature: "上班，摸鱼",
      weather: WeatherType.Sunny
    }, {
      id: 3,
      name: "周三",
      temperature: "上班，摸鱼",
      weather: WeatherType.Cloudy
    }, {
      id: 4,
      name: "周四",
      temperature: "上班，摸鱼",
      weather: WeatherType.Rainy
    }, {
      id: 5,
      name: "周五",
      temperature: "上班，努力奋斗",
      weather: WeatherType.Stormy
    }, {
      id: 6,
      name: "周六",
      temperature: "躺平",
      weather: WeatherType.Sunny
    }, {
      id: 7,
      name: "周末",
      temperature: "躺平",
      weather: WeatherType.Cloudy
    }].map((day: any) => {
      const getIcon = (): string => {
        switch (day.weather) {
          case WeatherType.Cloudy:
            return "fa-duotone fa-clouds";
          case WeatherType.Rainy:
            return "fa-duotone fa-cloud-drizzle";
          case WeatherType.Stormy:
            return "fa-duotone fa-cloud-bolt";
          case WeatherType.Sunny:
            return "fa-duotone fa-sun";
          default: return '';
        }
      }

      return (
        <div key={day.id} className="day-card">
          <div className="day-card-content">
            <span className="day-weather-temperature">{day.temperature}
            </span>
            <i className={`day-weather-icon ${getIcon()} ${day.weather.toLowerCase()}`} />
            <span className="day-name">{day.name}</span>
          </div>
        </div>
      );
    });
  }
  return (
    <MenuSection icon="fa-solid fa-sun" id="weather-section" scrollable title="日程">
      {getDays()}
    </MenuSection>
  )
}

const Tools: React.FC = () => {
  const getTools = (): JSX.Element[] => {
    return [{
      icon: "fa-solid fa-cloud-sun",
      id: 1,
      image: "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYXRoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      label: "Weather",
      name: "Cloudly"
    }, {
      icon: "fa-solid fa-calculator-simple",
      id: 2,
      image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FsY3VsYXRvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      label: "Calc",
      name: "Mathio"
    }, {
      icon: "fa-solid fa-piggy-bank",
      id: 3,
      image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmFua3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      label: "Bank",
      name: "Cashy"
    }, {
      icon: "fa-solid fa-plane",
      id: 4,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      label: "Travel",
      name: "Fly-er-io-ly"
    }, {
      icon: "fa-solid fa-gamepad-modern",
      id: 5,
      image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      label: "Games",
      name: "Gamey"
    }, {
      icon: "fa-solid fa-video",
      id: 6,
      image: "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpZGVvJTIwY2hhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      label: "Video Chat",
      name: "Chatty"
    }].map((tool: any) => {
      const styles: React.CSSProperties = {
        backgroundImage: `url(${tool.image})`
      }

      return (
        <div key={tool.id} className="tool-card">
          <div className="tool-card-background background-image" style={styles} />
          <div className="tool-card-content">
            <div className="tool-card-content-header">
              <span className="tool-card-label">{tool.label}</span>
              <span className="tool-card-name">{tool.name}</span>
            </div>
            <i className={`${tool.icon} tool-card-icon`} />
          </div>
        </div>
      );
    })
  }

  return (
    <MenuSection icon="fa-solid fa-toolbox" id="tools-section" title="What's Appening?">
      {getTools()}
    </MenuSection>
  );
}

const Restaurants: React.FC = () => {
  const getRestaurants = (): JSX.Element[] => {
    return [{
      desc: "搜集了非常多的免费软件工具",
      id: 1,
      className: "tools-image",
      title: "工具箱"
    }, {
      desc: "那些年做过的网站",
      id: 2,
      className: "web-image",
      title: "网站"
    }, {
      desc: "很多炫酷的页面组件,说不定就用上了",
      id: 3,
      className: "component-image",
      title: "组件"
    }, {
      desc: "大量知识扑面而来",
      id: 4,
      className: "article-image",
      title: "文章"
    }].map((restaurant: any) => {
      return (
        <div key={restaurant.id} className={"restaurant-card background-image " + restaurant.className} >
          <div className="restaurant-card-content">
            <div className="restaurant-card-content-items">
              <span className="restaurant-card-title">{restaurant.title}</span>
              <span className="restaurant-card-desc">{restaurant.desc}</span>
            </div>
          </div>
        </div>
      )
    });
  }
  return (
    <MenuSection icon="fa-regular fa-pot-food" id="restaurants-section" title="专题">
      {getRestaurants()}
    </MenuSection>
  )
}

const Movies: React.FC = () => {
  const getMovies = (): JSX.Element[] => {
    return [{
      desc: "A tale of some people watching over a large portion of space.",
      id: 1,
      icon: "fa-solid fa-galaxy",
      image: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFydmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      title: "Protectors of the Milky Way"
    }, {
      desc: "Some people leave their holes to disrupt some things.",
      id: 2,
      icon: "fa-solid fa-hat-wizard",
      image: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9yZCUyMG9mJTIwdGhlJTIwcmluZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      title: "Hole People"
    }, {
      desc: "A boy with a dent in his head tries to stop a bad guy. And by bad I mean bad at winning.",
      id: 3,
      icon: "fa-solid fa-broom-ball",
      image: "https://images.unsplash.com/photo-1632266484284-a11d9e3a460a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhcnJ5JTIwcG90dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      title: "Pot of Hair"
    }, {
      desc: "A long drawn out story of some people fighting over some space. Cuz there isn't enough of it.",
      id: 4,
      icon: "fa-solid fa-starship-freighter",
      image: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RhciUyMHdhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      title: "Area Fights"
    }].map((movie: any) => {
      const styles: React.CSSProperties = {
        backgroundImage: `url(${movie.image})`
      }

      const id: string = `movie-card-${movie.id}`;

      return (
        <div key={movie.id} id={id} className="movie-card">
          <div className="movie-card-background background-image" style={styles} />
          <div className="movie-card-content">
            <div className="movie-card-info">
              <span className="movie-card-title">{movie.title}</span>
              <span className="movie-card-desc">{movie.desc}</span>
            </div>
            <i className={movie.icon} />
          </div>
        </div>
      );
    })
  }

  return (
    <MenuSection icon="fa-solid fa-camera-movie" id="movies-section" scrollable title="Popcorn time!">
      {getMovies()}
    </MenuSection>
  );
}

interface IUserStatusButton {
  icon: string;
  id: string;
  userStatus: UserStatus;
}

const UserStatusButton: React.FC<IUserStatusButton> = (props: IUserStatusButton) => {
  const { userStatus, setUserStatusTo } = React.useContext(AppContext);

  const handleOnClick = (): void => {
    setUserStatusTo(props.userStatus);
  }

  return (
    <button
      id={props.id}
      className="user-status-button clear-button"
      disabled={userStatus === props.userStatus}
      type="button"
      onClick={handleOnClick}
    >
      <i className={props.icon} />
    </button>
  )
}

const Menu: React.FC = () => {
  return (
    <div id="app-menu">
      <div id="app-menu-content-wrapper">
        <div id="app-menu-content">
          <div id="app-menu-content-header">
            <div className="app-menu-content-header-section">
              <TimeInfo id="app-menu-info" />
              <Reminder />
            </div>
            <div className="app-menu-content-header-section">
              <UserStatusButton
                icon="fa-solid fa-arrow-right-from-arc"
                id="sign-out-button"
                userStatus={UserStatus.LoggedOut}
              />
            </div>
          </div>
          <QuickNav />
          <Weather />
          <Restaurants />
          <Tools />
          <Movies />
        </div>
      </div>
    </div>
  )
}

export default Menu;

