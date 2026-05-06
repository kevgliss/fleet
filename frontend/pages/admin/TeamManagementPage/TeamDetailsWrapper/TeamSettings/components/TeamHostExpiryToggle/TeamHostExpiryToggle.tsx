import Checkbox from "components/forms/fields/Checkbox";
import Icon from "components/Icon";
import React from "react";

import Button from "components/buttons/Button";

const baseClass = "team-host-expiry-toggle";

type HostExpiryWindowUnit = "days" | "hours";

const formatHostExpiryWindowUnit = (
  unit: HostExpiryWindowUnit | undefined,
  expiryWindow?: number
) => {
  const normalizedUnit = unit === "hours" ? "hour" : "day";
  return `${normalizedUnit}${expiryWindow !== 1 ? "s" : ""}`;
};

interface ITeamHostExpiryToggle {
  globalHostExpiryEnabled: boolean;
  globalHostExpiryWindow?: number;
  globalHostExpiryWindowUnit?: HostExpiryWindowUnit;
  teamExpiryEnabled: boolean;
  setTeamExpiryEnabled: (value: boolean) => void;
  gitopsModeEnabled?: boolean;
}

const TeamHostExpiryToggle = ({
  globalHostExpiryEnabled,
  globalHostExpiryWindow,
  globalHostExpiryWindowUnit,
  teamExpiryEnabled,
  setTeamExpiryEnabled,
  gitopsModeEnabled,
}: ITeamHostExpiryToggle) => {
  const renderHelpText = () =>
    // this will never be rendered while globalHostExpiryWindow is undefined
    globalHostExpiryEnabled ? (
      <div className="help-text">
        Host expiry is globally enabled in organization settings. By default,
        hosts expire after {globalHostExpiryWindow}{" "}
        {formatHostExpiryWindowUnit(
          globalHostExpiryWindowUnit,
          globalHostExpiryWindow
        )}
        .{" "}
        {!teamExpiryEnabled && (
          <Button
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setTeamExpiryEnabled(true);
            }}
            className={`${baseClass}__add-custom-window`}
            variant="text-icon"
            size="small"
            iconStroke
          >
            <>
              Add custom expiry window
              <Icon
                name="chevron-right"
                color="ui-fleet-black-75"
                size="small"
              />
            </>
          </Button>
        )}
      </div>
    ) : (
      <></>
    );
  return (
    <div className={`${baseClass}`}>
      <Checkbox
        name="enableHostExpiry"
        onChange={setTeamExpiryEnabled}
        value={teamExpiryEnabled || globalHostExpiryEnabled} // Still shows checkmark if global expiry is enabled though the checkbox will be disabled.
        disabled={globalHostExpiryEnabled || gitopsModeEnabled}
        helpText={renderHelpText()}
        labelTooltipContent={
          <>
            When enabled, allows automatic cleanup of
            <br />
            hosts that have not communicated with Fleet in
            <br />
            the expiry window specified in the{" "}
            <strong>
              Host expiry
              <br />
              window
            </strong>{" "}
            setting.{" "}
            <em>
              (Default: <strong>Off</strong>)
            </em>
          </>
        }
      >
        Enable host expiry
      </Checkbox>
    </div>
  );
};

export default TeamHostExpiryToggle;
