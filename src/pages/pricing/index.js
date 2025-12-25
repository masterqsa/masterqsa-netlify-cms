import React from "react";
import { Link } from "gatsby";

import Layout from "../../components/Layout";
import { SectionHeader } from "../../components/core/Headers";

export default function PricingIndexPage() {
  const [numOfQSAUsers, setNumOfQSAUsers] = React.useState(3);
  const [numOfUsers, setNumOfUsers] = React.useState(2);

  let calculatedPrice = 0;
  let isIndividualPlan = false;
  let pricingDescription = "";

  const PRICE_PER_OTHER_USER = 200000;
  const PRICE_TIER_1 = 580000;
  const MAX_NUM_QSA_USERS_TIER_1 = 10;
  const PRICE_TIER_2 = 480000;
  const MAX_NUM_QSA_USERS_TIER_2 = 20;

  function formatPrice(priceInCents) {
    return `$${(priceInCents / 100).toLocaleString("en-US")}`;
  }

  const planTiles = [
    {
      pricePerQSAUser: formatPrice(PRICE_TIER_1),
      rangeDescription: `First ${MAX_NUM_QSA_USERS_TIER_1} QSA users`,
    },
    {
      pricePerQSAUser: formatPrice(PRICE_TIER_2),
      rangeDescription: `Next ${MAX_NUM_QSA_USERS_TIER_1 +
        1}-${MAX_NUM_QSA_USERS_TIER_2} QSA users`,
    },
    {
      pricePerQSAUser: null,
      rangeDescription: `Next ${MAX_NUM_QSA_USERS_TIER_2 + 1}+ QSA users`,
    },
  ];

  if (numOfQSAUsers > 20) {
    isIndividualPlan = true;
    pricingDescription = `Contact us for an individual pricing per QSA user.\nFlat rate of ${formatPrice(
      PRICE_PER_OTHER_USER
    )} for each non-QSA user.`;
  } else if (numOfQSAUsers > 10) {
    calculatedPrice += (numOfQSAUsers - 10) * PRICE_TIER_2;
    calculatedPrice += 10 * PRICE_TIER_1;
    pricingDescription = `Pay ${formatPrice(
      PRICE_TIER_1
    )} per user for the first 10 QSA users, and ${formatPrice(
      PRICE_TIER_2
    )} per user up to 20 QSA users.\nFlat rate of ${formatPrice(
      PRICE_PER_OTHER_USER
    )} for each non-QSA user.`;
  } else {
    calculatedPrice += numOfQSAUsers * PRICE_TIER_1;
    pricingDescription = `Pay ${formatPrice(
      PRICE_TIER_1
    )} per user up to 10 QSA users, with a tiered discount for more than 10 QSA users.\nFlat rate of ${formatPrice(
      PRICE_PER_OTHER_USER
    )} for each non-QSA user.`;
  }

  calculatedPrice += numOfUsers * PRICE_PER_OTHER_USER;

  return (
    <Layout>
      <div className="section">
        <SectionHeader className="has-text-centered">Pricing</SectionHeader>
      </div>
      <section className="section">
        <div className="container">
          <div className="content">
            <div
              class="box"
              style={{
                display: "flex",
                gap: "3rem",
                maxWidth: 1024,
                margin: `0 auto`,
              }}
            >
              <div style={{ flexShrink: 0, flexBasis: "260px" }}>
                <h4 class="is-size-5">Pricing calculator</h4>
                <div className="field">
                  <div className="field-label is-normal">
                    <label className="label" htmlFor="numOfQSAUsers">
                      How many QSA users?
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input
                          id="numOfQSAUsers"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="num of users"
                          value={numOfQSAUsers}
                          onChange={(e) =>
                            setNumOfQSAUsers(Number(e.target.value))
                          }
                          className="input pricingCalculator__input"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-label is-normal">
                    <label className="label" htmlFor="numOfUsers">
                      How many non-QSA users? *
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control" style={{ marginBottom: 0 }}>
                        <input
                          id="numOfUsers"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="num of users"
                          value={numOfUsers}
                          onChange={(e) =>
                            setNumOfUsers(Number(e.target.value))
                          }
                          className="input pricingCalculator__input"
                        />
                      </p>
                      <p className="help" style={{ marginBottom: 0 }}>
                        * Including Associate QSA. Client Users are free of
                        charge.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="is-size-5">Annual pricing summary</h4>
                {isIndividualPlan ? (
                  <p>
                    <Link
                      className="button is-outlined is-primary"
                      to="/contact"
                    >
                      Contact us
                    </Link>
                  </p>
                ) : (
                  <>
                    <p style={{ margin: 0 }}>
                      <span className="is-size-3 has-text-brand">
                        {formatPrice(calculatedPrice)}
                      </span>{" "}
                      / year
                    </p>
                    <p>
                      For {numOfQSAUsers} QSA users and {numOfUsers} non-QSA
                      users.
                    </p>
                  </>
                )}
                <p style={{ whiteSpace: "pre-wrap" }}>{pricingDescription}</p>
              </div>
            </div>
            <h3 style={{ margin: "2.5rem 0 2rem" }}>Progressive price</h3>
            <div
              style={{
                display: "grid",
                gap: "3rem",
                gridAutoColumns: "1fr",
                gridAutoFlow: "column",
                alignItems: "stretch",
                textAlign: "center",
                maxWidth: 1024,
                margin: `0 auto`,
              }}
            >
              {planTiles.map(({ pricePerQSAUser, rangeDescription }, idx) => {
                return (
                  <div
                    class="box is-flex"
                    key={idx}
                    style={{ margin: 0, flexDirection: "column" }}
                  >
                    <div
                      style={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        class="is-flex is-align-items-center"
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          flexGrow: 1,
                        }}
                      >
                        {pricePerQSAUser != null ? (
                          <h4 class="is-size-4" style={{ margin: "1rem 0" }}>
                            {pricePerQSAUser} <br />
                            <small class="is-size-6 has-text-grey">
                              per QSA user
                            </small>
                          </h4>
                        ) : (
                          <Link
                            className="button is-outlined is-primary"
                            to="/contact"
                          >
                            Contact us
                          </Link>
                        )}
                      </div>
                      <p style={{ margin: "0.5rem 0 1rem" }}>
                        {rangeDescription}
                      </p>
                    </div>
                    <hr style={{ height: "1px" }} />
                    <h4 class="is-size-4">
                      {formatPrice(PRICE_PER_OTHER_USER)} <br />
                      <small class="is-size-6 has-text-grey">
                        per non-QSA user *
                      </small>
                    </h4>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                maxWidth: 1024,
                margin: `0 auto`,
              }}
            >
              <hr style={{ height: "1px" }} />
              <p className="is-size-7">
                * Including Associate QSA. Client Users are free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
