# Build the sample contract in this directory using Beaker and output to ./artifacts
from pathlib import Path
import pyteal as pt
import crowdsourcing


def build() -> Path:
    """Build the beaker app, export it to disk, and return the Path to the app spec file"""
    app_spec = crowdsourcing.app.build()
    output_dir = Path(__file__).parent / "artifacts"
    print(f"Dumping {app_spec.contract.name} to {output_dir}")
    app_spec.export(output_dir)

    # pt.Compilation.compile(
    #     teal_filename = output_dir / 'approval.teal'
    # )

    return output_dir / "application.json"


if __name__ == "__main__":
    build()
