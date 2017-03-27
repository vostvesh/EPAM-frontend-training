let calendarDomData = {
  0: {
    tagName: 'div',
    options: {
      class: 'calendar'
    },
    children: {
      0: {
        tagName: 'div',
        options: {
          class: 'calendar__header'
        },
        children: {
          0: {
            tagName: 'div',
            options: {
              class: 'calendar__header-select'
            },
            children: {
              0: {
                tagName: 'svg',
                options: {
                  class: 'calendar__header-arrow calendar__header-arrow--left',
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  d: "M22 12l-20 12 7.289-12-7.289-12z"                  
                }
              }
            }
          },
          1: {
            tagName: 'div',
            options: {
              class: 'calendar__header-date'
            },
            children: {
              0: {
                tagName: 'div',
                options: {
                  class: 'calendar__header-text'
                },
                children: {
                  0: {
                    tagName: 'span',
                    options: {
                      class: "calendar__header-month"
                    }
                  },
                  1: {
                    tagName: 'span',
                    options: {
                      class: "calendar__header-year"
                    }
                  }
                }
              }
            }
          },
          2: {
            tagName: 'div',
            options: {
              class: 'calendar__header-select'
            },
            children: {
              0: {
                tagName: 'svg',
                options: {
                  class: 'calendar__header-arrow',
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  d: "M22 12l-20 12 7.289-12-7.289-12z"                  
                }
              }
            }
          }
        }
      },
      1: {
        tagName: 'div',
        options: {
          class: 'calendar__daynames'
        }
      },
      2: {
        tagName: 'div',
        options: {
          class: 'calendar__days'
        }
      },
      3: {
        tagName: 'div',
        options: {
          class: 'calendar__footer'
        },
        children: {
          0: {
            tagName: 'div',
            options: {
             class: "calendar__date-time"
            },
            children: {
              0: {
                tagName: 'span',
                options: {
                  class: "clanedar__time-text"
                }
              },
              1: {
                tagName: 'span',
                options: {
                  class: "calendar__weekday-text"
                }
              }
            }
          }
        }
      }
    }
  }
}