import React from "react";
import { UserStatus, WeatherType } from "../../models/home"
import AppContext from "../../contexts/homeContext"
import TimeInfo from "../../components/timeInfo"
import Setting from "../../setting.json"
import "../../assets/css/home.scss";

import { PoweroffOutlined } from '@ant-design/icons';

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
      position: { x: e.clientX, left: ref.current?.scrollLeft ?? 0 }
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

// const Reminder: React.FC = () => {
//   return (
//     <div className="reminder">
//       <div className="reminder-icon">
//         <i className="fa-regular fa-bell" />
//       </div>
//     </div>
//   )
// }

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
      { id: 1, label: "前端" },
      { id: 2, label: "爬虫" },
      { id: 3, label: "反编译" },
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
      temperature: "工作日",
      weather: WeatherType.Sunny
    }, {
      id: 2,
      name: "周二",
      temperature: "工作日",
      weather: WeatherType.Sunny
    }, {
      id: 3,
      name: "周三",
      temperature: "工作日",
      weather: WeatherType.Cloudy
    }, {
      id: 4,
      name: "周四",
      temperature: "工作日",
      weather: WeatherType.Rainy
    }, {
      id: 5,
      name: "周五",
      temperature: "工作日",
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
  return (<MenuSection icon="fa-solid fa-sun" id="weather-section" scrollable title="日程">{getDays()}</MenuSection>)
}

const Tools: React.FC = () => {
  const getTools = (): JSX.Element[] => {
    return [{
      icon: "fa-solid fa-cloud-sun",
      id: 1,
      className: "activity1-img",
      label: "Weather",
      name: "我的开发语言"
    }, {
      icon: "fa-solid fa-calculator-simple",
      id: 2,
      className: "activity2-img",
      label: "Calc",
      name: "星星"
    }, {
      icon: "fa-solid fa-piggy-bank",
      id: 3,
      className: "activity3-img",
      label: "Bank",
      name: "Cashy"
    }, {
      icon: "fa-solid fa-plane",
      id: 4,
      className: "activity4-img",
      image: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/82432880-3e69-4d54-a8ab-2253bc9b3ca6/original=true/00191-2002737404.jpeg",
      label: "Travel",
      name: "Fly-er-io-ly"
    }, {
      icon: "fa-solid fa-gamepad-modern",
      id: 5,
      className: "activity5-img",
      image: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/908ae78a-f13f-4c3d-b3dd-64f340504ec6/original=true/00130-455216643.jpeg",
      label: "Games",
      name: "Gamey"
    }, {
      icon: "fa-solid fa-video",
      id: 6,
      className: "activity6-img",
      image: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/e6a0972c-69ee-4bdb-bd16-c4e7706181dd/original=true/00138-2379159556.jpeg",
      label: "Video Chat",
      name: "Chatty"
    }].map((tool: any) => {
      return (
        <div key={tool.id} className="tool-card">
          <div className={"tool-card-background background-image " + tool.className}></div>
        </div>
      );
    })
  }

  return (<MenuSection icon="fa-solid fa-toolbox" id="tools-section" title="活动">{getTools()}</MenuSection>);
}

const Restaurants: React.FC = () => {
  const cardOnClick = (restaurant: any): void => { window.open(Setting.MainUrl + restaurant.url, "_blank"); }

  const getRestaurants = (): JSX.Element[] => {
    return [{
      desc: "搜集了非常多的免费软件工具",
      id: 1,
      className: "tools-image",
      title: "工具箱",
      url: "",
    }, {
      desc: "那些年做过的网站",
      id: 2,
      className: "web-image",
      url: "/project",
      title: "网站"
    }, {
      desc: "很多炫酷的页面组件,说不定就用上了",
      id: 3,
      className: "component-image",
      url: "/components",
      title: "组件"
    }, {
      desc: "大量知识扑面而来",
      id: 4,
      className: "article-image",
      url: "/article",
      title: "文章"
    }].map((restaurant: any) => {
      return (
        <div key={restaurant.id} className="restaurant-card" onClick={() => cardOnClick(restaurant)} >
          <div className={" background-image " + restaurant.className}></div>
          <div className="restaurant-card-content">
            <div className="restaurant-card-content-items">
              <span className="restaurant-card-title">{restaurant.title}</span>
              <span className="restaurant-card-desc">{restaurant.desc}</span>
            </div>
          </div>
        </div >
      )
    });
  }

  return (<MenuSection icon="fa-regular fa-pot-food" id="restaurants-section" title="专题">{getRestaurants()}</MenuSection>)
}

const Movies: React.FC = () => {
  const getMovies = (): JSX.Element[] => {
    return [{
      desc: "A tale of some people watching over a large portion of space.",
      id: 1,
      icon: "fa-solid fa-galaxy",
      imageClass: "redwushi-image",
      title: "Protectors of the Milky Way"
    },
    {
      desc: "Some people leave their holes to disrupt some things.",
      id: 2,
      icon: "fa-solid fa-hat-wizard",
      imageClass: "yingguanggril-image",
      title: "Hole People"
    },
    {
      desc: "A boy with a dent in his head tries to stop a bad guy. And by bad I mean bad at winning.",
      id: 3,
      icon: "fa-solid fa-broom-ball",
      imageClass: "redfenghaung-image",
      title: "Pot of Hair"
    },
    {
      desc: "A long drawn out story of some people fighting over some space. Cuz there isn't enough of it.",
      id: 4,
      icon: "fa-solid fa-starship-freighter",
      imageClass: "drag-image",
      title: "Area Fights"
    }].map((movie: any) => {
      const id: string = `movie-card-${movie.id}`;
      // <div className={"movie-card-background background-image " + movie.imageClass} >
      return (
        <div key={movie.id} id={id} className="movie-card">
          <div className={"movie-card-background background-image " + movie.imageClass}></div>
          <div className={" character background-image " + movie.imageClass + '-preview'}></div>
          {/* <img
            src="https://ggayane.github.io/css-experiments/cards/force_mage-character.webp"
            className="character"
          /> */}

          {/* <img
            src="https://ggayane.github.io/css-experiments/cards/force_mage-character.webp"
            className="character"
          /> */}

          {/* <div className="movie-card-content">
            <div className="movie-card-info">
              <span className="movie-card-title">{movie.title}</span>
              <span className="movie-card-desc">{movie.desc}</span>
            </div>
            <i className={movie.icon} />5
          </div> */}
        </div>
      );
    })
  }

  return (
    <MenuSection icon="fa-solid fa-camera-movie" id="movies-section" scrollable title="娱乐">
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
  const handleOnClick = (): void => { setUserStatusTo(props.userStatus); }

  {/* <PoweroffOutlined /> */ }

  return (
    <PoweroffOutlined
      id={props.id}
      className="user-status-button clear-button"
      disabled={userStatus === props.userStatus}
      style={{ color: '#fff' }}
      type="button"
      onClick={handleOnClick}
    />

    // <button
    //   id={props.id}
    //   className="user-status-button clear-button"
    //   disabled={userStatus === props.userStatus}
    //   type="button"
    //   onClick={handleOnClick}
    // ><i className={props.icon} /></button>
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
            </div>
            <UserStatusButton
              icon="fa-solid fa-arrow-right-from-arc"
              id="sign-out-button"
              userStatus={UserStatus.LoggedOut}
            />
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

